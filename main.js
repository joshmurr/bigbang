var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

var w = can.width, h = can.height;
var gravity = new vec(0, 10);
var antiGrav = new vec(0, -10);
var center = new vec(w/4,h/2);
var friction = 0.98;
var wind = new vec(0.15, 0);
var systems = [];
var att = new attractor(new vec(w/2, h/2));
var st = 0, count = 0;

var states = {
	"states":[
	    {"emitters": [
	    	{
	    		"draw": "true",
	    		"x": "251",
	    		"y": "251"
	    	}
	    ],
		"forceList": [
	        {
	        	"add": "false",
	            "x": "0",
	            "y": "0"
	        }
	    ],
	    "attractors": [
	    	{
	    		"add": "true",
	    		"x": "250",
	    		"y": "250",
	    		"mass": "5",
	    		"G": "500"
	    	}
	    ]},
	
		{"emitters": [
	    	{
	    		"draw": "true",
	    		"x": "400",
	    		"y": "400"
	    	}
	    ],
		"forceList": [
	        {
	        	"add": "true",
	            "x": "0.1",
	            "y": "0"
	        }
	    ],
	    "attractors": [
	    	{
	    		"add": "true",
	    		"x": "50",
	    		"y": "50",
	    		"mass": "5",
	    		"G": "200"
	    	},
	    	{
	    		"add": "true",
	    		"x": "450",
	    		"y": "450",
	    		"mass": "5",
	    		"G": "200"
	    	}
	    ]},

	    {"emitters": [
	    	{
	    		"draw": "false",
	    		"x": "0",
	    		"y": "0"
	    	}
	    ],
	    "forceList": [
	        {
	        	"add": "false",
	            "x": "0",
	            "y": "10"
	        }
	    ],
	    "attractors": [
	    	{
	    		"add": "false",
	    		"x": "0",
	    		"y": "0",
	    		"mass": "0",
	    		"G": "0"
	    	}
	    ]}

	]
}

function setState(){
	//CLEAR FORCES
	for(var s=0; s<systems.length; s++){
		systems[s].forces = [];
		systems[s].attractors = [];
	}

	var s = states.states[st];
	console.log("Current State: " + st);
	this.addParticleSystem = function(psLoc){
		systems.unshift(new particleSystem(psLoc));
	}

	this.addForce = function(force){
		for(var i=0; i<systems.length; i++){
			systems[i].forces.push(force);
		}
	}

	this.addAttractor = function(attractor){
		for(var j=0; j<systems.length; j++){
			systems[j].attractors.push(attractor);
		}
	}
	
	for(var l=0; l<s.emitters.length; l++){
		if(s.emitters[l].draw == "false") {
			break;
		}
		else {
			var psl = new vec(+s.emitters[l].x,+s.emitters[l].y);
			this.addParticleSystem(psl);
		}
	}

	for(var j=0; j<s.forceList.length; j++){
		if(s.forceList.add == "false") break;
		else this.addForce(new vec(+s.forceList[j].x, +s.forceList[j].y));
	}

	for(var k=0; k<s.attractors.length; k++){
		var att = s.attractors[k];
		if(att.add == "false") break;
		else this.addAttractor(new attractor(new vec(+att.x, +att.y), +att.mass, +att.G));
	}
	if(st<states.states.length-1) st++;
	else return;
}

function setup(){
	hide("startButton");
	setState(st);
	show("stateButton");
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  updateParticleSystem();
  //if(systems.length>0 && count % 100 === 0) console.log(systems[0].particles[0].location.x);
  //count++;
  console.log(systems.length);
}

setInterval(draw, 30);