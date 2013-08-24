function particle(loc_, acc_, mass_, colours_) {
  this.mass = mass_, this.G = 1;
  this.location = loc_;
  this.velocity = new vec(0, 0);
  this.acceleration = acc_;
  this.lifeSpan = 255;

  this.dead = false;
  this.r = this.g = this.b = 0;
  this.c = colours_;
  this.id = "";

  this.applyForce = function (force_) {
    this.force = new vec(force_.x, force_.y);
    this.force = this.force.div(this.mass);
    this.acceleration = this.acceleration.add(this.force);
  };

  this.attract = function(p){
    this.force = p.location.sub(this.location);
    this.distance = this.force.length();
    if(this.distance < 5) this.distance = 5;
    else if(this.distance > 25) this.distance = 25;
    this.force.normalise();
    this.strength = (this.G*this.mass*p.mass)/(this.distance*this.distance);
    this.force = this.force.mult(this.strength);
    return this.force;
  }

  this.detectCollision = function(p){
    var dx = p.location.x - this.location.x;
    var dy = p.location.y - this.location.y;
    var distSq = dx*dx + dy*dy;
    if(distSq < (this.mass + p.mass)/2){
      return true;
    } else {
      return false;
    }
  }

  this.setRandomColour = function(){
    this.r = Math.floor(Math.random()*255);
    this.g = Math.floor(Math.random()*255);
    this.b = Math.floor(Math.random()*255);
  }

  this.setColour = function(colour){
    switch(colour) {
      case 0:
        var selector = Math.floor(Math.random()*2);
        if(selector == 1){
          this.r = 255;
          this.g = 0;
          this.b = 0;
          this.id = "red";
        } else {
          this.r = 0;
          this.g = 0;
          this.b = 255;
          this.id = "blue";
        }
        break;
      case 1:
        this.r = 255;
        this.g = 255;
        this.b = 255;
        var chars = ["a","b","c","d","e","f","g","h","i","j","k","l"];
        var word = chars[Math.floor(Math.random()*chars.length)] + chars[Math.floor(Math.random()*chars.length)];
        this.id = word;
        break;
      default:
        this.r = this.g = this.b = 255;
    }
  }
  this.setColour(this.c);

  this.draw = function(c){
    this.velocity = this.velocity.add(this.acceleration);
    this.location = this.location.add(this.velocity);
    this.acceleration = this.acceleration.mult(0);
    ctx.beginPath();
    if(c !== this.c){
      this.c = c;
      this.setColour(this.c);
    }
    ctx.fillStyle= "rgba("+this.r+","+this.g+","+this.b+"," + map(this.lifeSpan,0,255,0,1)+")";
    ctx.arc(this.location.x, this.location.y, this.mass, 0, Math.PI*2);
    ctx.fill();
  };
}