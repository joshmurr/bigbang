var can = document.getElementById("canvas");
var ctx = can.getContext("2d");
//can.addEventListener("mousedown", addParticleSystemMouse, false);

var w = can.width, h = can.height;
var gravity = new vec(0, 10);
var antiGrav = new vec(0, -10);
var center = new vec(w/4,h/2);
var friction = 0.98;
var wind = new vec(0.15, 0);
var systems = [];
var att = new attractor(new vec(w/2, h/2));
var st = 0;

var states = {
	"states":[
	    {"forceList": [
	        {
	            "x": "0",
	            "y": "1"
	        },
	        {
	            "x": "-0.1",
	            "y": "-0.05"
	        }
	    ],
	    "attractors": [
	    	{
	    		"x": "350",
	    		"y": "400",
	    		"mass": "2",
	    		"G": "500"
	    	},
	    	{
	    		"x": "200",
	    		"y": "200",
	    		"mass": "10",
	    		"G": "300"
	    	}
	    ]},
	
		{"forceList": [
	        {
	            "x": "-1",
	            "y": "0"
	        },
	        {
	            "x": "0.5",
	            "y": "0"
	        }
	    ],
	    "attractors": [
	    	{
	    		"x": "10",
	    		"y": "90",
	    		"mass": "1",
	    		"G": "200"
	    	},
	    	{
	    		"x": "500",
	    		"y": "450",
	    		"mass": "8",
	    		"G": "900"
	    	}
	    ]},

	    {"forceList": [
	        {
	            "x": "0",
	            "y": "10"
	        }
	    ],
	    "attractors": [
	    	{
	    		"x": "0",
	    		"y": "0",
	    		"mass": "0",
	    		"G": "0"
	    	}
	    ]}

	]
}

function setState(num){
	//CLEAR FORCES
	for(var s=0; s<systems.length; s++){
		systems[s].forces = [];
		systems[s].attractors = [];
	}

	var s = states.states[num];
	console.log("Current State: " + num)
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
	

	for(var j=0; j<s.forceList.length; j++){
		this.addForce(new vec(s.forceList[j].x, s.forceList[j].y));
	}

	for(var k=0; k<s.attractors.length; k++){
		var att = s.attractors[k];
		this.addAttractor(new attractor(new vec(att.x, att.y), att.mass, att.G));
	}
	st++;
}

function setup(){
	hide("startButton");
	addParticleSystem(center);
	setState(st);
	show("stateButton");
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  updateParticleSystem();
  console.log(systems.length);
}

setInterval(draw, 30);