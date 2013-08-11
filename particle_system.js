function particleSystem(origin_) {
  var origin = new vec(origin_.x, origin_.y);
  this.constantLimit = 100;
  this.limit = this.constantLimit;
  this.particles = [];
  this.forces = [], this.attractors = [];
  this.full = false;
  this.finished = false;
  this.deathToll = 0;

  this.addBatchParticles = function () {
    for (var i = 0; i < this.limit; i++) {
      this.particles.unshift(new particle(origin, new vec((Math.random() * 4) - 2, (Math.random() * 4) - 2), 5));
    }
  };

  this.addParticles = function (loc_) {
    if (this.limit === 0) {
      this.full = true;
      return;
    } else {
      this.particles.unshift(new particle(origin, new vec((Math.random() * 10) - 5, (Math.random() * 10) - 5), Math.random()*10));
      this.limit--;
    }
  };

  this.updateParticles = function (p_) {
    var p = p_;

    for(var i=0; i<this.forces.length; i++){
      p.applyForce(this.forces[i]);
    }

    for(var j=0; j<this.attractors.length; j++){
      p.applyForce(this.attractors[j].attract(p));
      this.attractors[j].draw();
    }

    //p.applyForce(att.attract(p));

    this.bounceOffEdges(p);

    p.velocity = p.velocity.add(p.acceleration);
    p.location = p.location.add(p.velocity);
    p.acceleration = p.acceleration.mult(0);

    p.lifeSpan-=0.5;

    if (p.lifeSpan <= 1) {
      p.dead = true;
    } else {
      p.dead = false;
    }

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

  this.applyForce = function(force){
    this.forces.push(force);
  }

  this.drawParticles = function (p_) {
    var p = p_;
    p.draw();
  };

  this.run = function () {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      this.updateParticles(p);
      this.drawParticles(p);
      if (p.dead) {
        this.deathToll++;
        this.particles.splice(i, 1);
        if(this.deathToll == this.constantLimit){
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

  var origin = new vec(x, y);
  systems.unshift(new particleSystem(origin));
}

function addParticleSystem(loc) {
  systems.unshift(new particleSystem(loc));
}

function updateParticleSystem() {
  for (var i = 0; i < systems.length; i++) {
    var ps = systems[i];
    if(ps.finished){
      systems.splice(i, 1);
    } else {
      ps.addParticles();
      ps.run();
    }
  }
}