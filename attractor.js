function attractor(loc_, mass_, g_){
  this.location = new vec(loc_.x, loc_.y);
  this.mass = mass_;
  this.G = g_;

  this.draw = function(){
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.location.x, this.location.y, this.mass, this.mass);
  }

  this.attract = function(p_){
    this.p = p_;
    this.dir = this.location.sub(this.p.location);
    this.d = this.dir.length();
    this.dir.normalise();
    this.force = this.G/(this.mass*this.d*this.d);
    this.dir.mult(this.force);
    return this.dir;
  };
}