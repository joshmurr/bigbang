function attractor(loc_, mass_, g_){
  var location = new vec(loc_.x, loc_.y);
  this.mass = mass_;
  this.G = g_;

  this.draw = function(){
    ctx.fillStyle = "yellow";
    ctx.fillRect(location.x, location.y, this.mass, this.mass);
  }

  this.attract = function(p_){
    this.p = p_;
    this.dir = location.sub(this.p.location);
    this.d = this.dir.length();
    this.dir.normalise();
    this.force = this.G/(this.mass*this.d*this.d);
    this.dir.mult(this.force);
    return this.dir;
  };
}