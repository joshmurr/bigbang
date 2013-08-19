function particle(loc_, acc_, mass_) {
  this.mass = mass_;
  this.location = loc_;
  this.velocity = new vec(0, 0);
  this.acceleration = acc_;
  this.lifeSpan = 255;
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
    this.velocity = this.velocity.add(this.acceleration);
    this.location = this.location.add(this.velocity);
    this.acceleration = this.acceleration.mult(0);
    //console.log("ST FROM PART == " + st);
    ctx.beginPath();
    //if(st < 2) ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+"," + map(this.lifeSpan,0,255,0,1)+")";
    ctx.fillStyle= "rgba("+this.r+","+this.g+","+this.b+"," + map(this.lifeSpan,0,255,0,1)+")";
    ctx.arc(this.location.x, this.location.y, this.mass, 0, Math.PI*2);
    ctx.fill();
  };
}