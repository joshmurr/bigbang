function particle(loc_, acc, mass_) {
  this.mass = mass_;
  this.loc = loc_;
  this.velocity = new vec(0, 0);
  this.acceleration = acc;
  this.lifeSpan = 255;
  this.dead = false;
  this.r=0, this.g=0, this.b=0;
  this.counter = 1;

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
    this.velocity = this.velocity.add(this.acceleration);
    this.loc = this.loc.add(this.velocity);
    this.acceleration = this.acceleration.mult(0);

    ctx.beginPath();
    ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+"," + map(this.lifeSpan,0,255,0,1)+")";
    ctx.arc(this.loc.x, this.loc.y, this.mass, 0, Math.PI*2);
    ctx.fill();
  };
}