function particleSystem(origin_, numParts, ke_) {
  this.origin = origin_;
  this.offCent = new vec(this.origin.x+1, this.origin.y+1);
  this.limit =  numParts;
  this.particles = [], this.attractors = [];
  this.finished = false, this.deathToll = 0, this.keepEmitting = ke_, this.attractAllBoolean = false;
  this.colours = 999;
  this.collideAndDie = false;
  this.outOfBoundsAndDie = true;

  this.updateCenter = function(newCenter){
    this.origin = newCenter;
    for(var i=0; i<this.attractors.length; i++){
      this.attractors[i].location = newCenter;
      this.offCent = new vec(newCenter.x+1, newCenter.y+1);
    }
  }

  this.addBatchParticles = function () {
    for (var i = 0; i < this.limit; i++) {
      this.particles.push(new particle(new vec(Math.random()*w, Math.random()*h), new vec((Math.random()*2)-1, (Math.random()*2)-1), (Math.random()*15)+1, this.colours));
    }
  };

  this.addParticles = function() {
    if(this.attractAllBoolean == true){
      return;
    } else {
      if(this.keepEmitting == "false") {
        if (this.limit === 0) {
          return;
        } else {
          if(st == 1) this.particles.push(new particle(this.origin, new vec((Math.random()*2)-1, (Math.random()*2)-1), 1, this.colours));
          else this.particles.push(new particle(this.origin, new vec((Math.random()*10)-5, (Math.random()*10)-5), (Math.random()*6)+2, this.colours));
          this.limit--;
        }
      } else {
          if(this.particles.length >= this.limit){
            return;
          } else {
            this.particles.push(new particle(this.origin, new vec((Math.random()*4)-2, (Math.random()*4)-2), (Math.random()*6)+2, this.colours));
        }
      }
    }
  };

  this.outOfBounds = function(p){
    if (p.location.x < p.mass) p.lifeSpan-=51;
    else if (p.location.x > w - p.mass) p.lifeSpan-=51;
    else if (p.location.y < p.mass) p.lifeSpan-=51;
    else if (p.location.y > h - p.mass) p.lifeSpan-=51;
    else p.lifeSpan = 255;
  };

  this.bounceOffEdges = function(p){
    if (p.location.x < p.mass) {
      p.location.x = p.mass;
      p.velocity.x *= -1;
    } else if (p.location.x > w - p.mass) {
      p.location.x = w - p.mass;
      p.velocity.x *= -1;
    } else if (p.location.y < p.mass) {
      p.location.y = p.mass;
      p.velocity.y *= -1;
    } else if (p.location.y > h - p.mass) {
      p.location.y = h - p.mass;
      p.velocity.y *= -1;
      p.velocity = p.velocity.mult(friction);
    }
  };

  this.attractAll = function() {
    
  }

  this.run = function () {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];

      /*for (var k = 0; k < this.forces.length; k++) {
        p.applyForce(this.forces[k]);
      }*/
  
      for (var j = 0; j < this.attractors.length; j++) {
        p.applyForce(this.attractors[j].attract(p));
        //this.attractors[j].draw();
      }

      if(this.outOfBoundsAndDie) this.outOfBounds(p);
      //this.bounceOffEdges(p);

      var pr = p.mass/2;
      if(this.attractAllBoolean == true) {
          for(var j=0; j<this.particles.length; j++){
            var p2 = this.particles[j];
            var p2r = p2.mass/2;
            if(i !== j && p.id !== p2.id){
              var f = p.attract(p2);
              p.applyForce(f);
              if(!this.collideAndDie){
                break;
              } else {
                if(p.detectCollision(p2)){
                  this.particles.splice(i, 1);
                  this.particles.splice(j, 1);
                }
              }
            }
          }
      }
      
      if (p.lifeSpan <= 1) {
        p.dead = true;
      } else {
        p.dead = false;
      }

      p.draw(this.colours);

      if (p.dead) {
        this.deathToll++;
        this.particles.splice(i, 1);
        if(this.particles.length === 0) {
          console.log("FIN");
          this.finished = true;
        }
      }
    }
  };
}

function updateParticleSystem() {
  //ctx.fillStyle = "red";
  //ctx.fillRect(ps.origin.x,ps.origin.y, 3,3);
  system.addParticles();
  system.run();
}