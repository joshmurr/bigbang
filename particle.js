function particle(loc, acc, mass_) {
  this.mass = mass_;
  this.location = new vec(loc.x, loc.y);
  this.velocity = new vec(0, 0);
  this.acceleration = new vec(acc.x, acc.y);
  this.lifeSpan = 2000;
  this.dead = false;
  this.r=0, this.g=0, this.b=0;

  this.applyForce = function (force_) {
    var force = new vec(force_.x, force_.y);
    force = force.div(this.mass);
    this.acceleration = this.acceleration.add(force);
  };

  this.setRandomColour = function(){
    this.r = Math.floor(Math.random()*255);
    this.g = Math.floor(Math.random()*255);
    this.b = Math.floor(Math.random()*255);
  }

  this.setRandomColour();

  this.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = "rgba(" + this.r+","+255+","+255+"," + map(this.lifeSpan,0,255,0,1) + ")";
    ctx.arc(this.location.x, this.location.y, this.mass, 0, Math.PI * 2);
    ctx.fill();
  };
}