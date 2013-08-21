function particleSystem(origin_, numParts, ke_) {
  //MAYBE ADD 'LIMITER' BOOLEAN TO PARTICLE SYSTEM
  //IF(LIMITER) LIMIT NUMS
  //ELSE ADDPARTICLES();
  this.origin = origin_;
  this.constantLimit = numParts;
  this.limit = this.constantLimit;
  this.particles = [], this.forces = [], this.attractors = [];
  this.finished = false, this.deathToll = 0, this.keepEmitting = ke_, this.stop = false;

  this.addBatchParticles = function () {
    for (var i = 0; i < this.limit; i++) {
      this.particles.unshift(new particle(this.origin, new vec((Math.random() * 4) - 2, (Math.random() * 4) - 2), 5));
    }
  };

  this.addParticles = function(maintain) {
    if(this.stop == true){
      return;
    } else {
      if(this.keepEmitting == "false") {
        if (this.limit === 0) {
          return;
        } else {
          if(st == 1) this.particles.push(new particle(this.origin, new vec((Math.random() * 2) - 1, (Math.random() * 2) - 1), 1));
          else this.particles.push(new particle(this.origin, new vec((Math.random() * 10) - 5, (Math.random() * 10) - 5), (Math.random()*6)+2));
          this.limit--;
        }
      } else {
          if(this.particles.length >= this.limit){
            return;
          } else {
            this.particles.push(new particle(this.origin, new vec((Math.random() * 4) - 2, (Math.random() * 4) - 2), (Math.random()*6)+2));
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

  this.run = function () {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];

      for (var k = 0; k < this.forces.length; k++) {
        p.applyForce(this.forces[k]);
      }
  
      for (var j = 0; j < this.attractors.length; j++) {
        p.applyForce(this.attractors[j].attract(p));
        //this.attractors[j].draw();
      }

      this.outOfBounds(p);
      //this.bounceOffEdges(p);

      if(st == 4) {
        for(var j=0; j<this.particles.length; j++){
          var p2 = this.particles[j];
          if(i !== j && p.id !== p2.id){
            //console.log("Attracting " +i+ " with "+j);
            var f = p.attract(p2);
            p.applyForce(f);
          }
        }
      }
  
      if (p.lifeSpan <= 1) {
        p.dead = true;
      } else {
        p.dead = false;
      }

      p.draw();

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

function addParticleSystemMouse(e) {
  var x = e.x;
  var y = e.y;

  x -= can.offsetLeft;
  y -= can.offsetTop;

  var mOrigin = new vec(x, y);
  systems.unshift(new particleSystem(mOrigin));
}

function updateParticleSystem() {
  for (var i = 0; i < systems.length; i++) {
    var ps = systems[i];
    if(ps.finished){
      systems.splice(i, 1);
    } else {
      //ctx.fillStyle = "red";
      //ctx.fillRect(ps.origin.x,ps.origin.y, 3,3);
      ps.addParticles(i);
      ps.run();
    }
  }
}