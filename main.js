var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

var w = can.width, h = can.height;
var center = new vec(w/4,h/2);
var friction = 0.98;
var systems = [];
var st = 0, count = 0;

var states = {
	"states":[
	    {"emitters": [
	    	{
	    		"draw": "true",
	    		"numParts": "1",
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
	    		"numParts": "50",
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
	    		"draw": "true",
	    		"numParts": "100",
	    		"x": "100",
	    		"y": "100"
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
	    		"add": "true",
	    		"x": "250",
	    		"y": "250",
	    		"mass": "5",
	    		"G": "200"
	    	}
	    ]}

	]
}

function setState(){
	//CLEAR FORCES
	for(var a=0; a<systems.length; a++){
		systems[a].forces = [];
		systems[a].attractors = [];
	}

	var s = states.states[st];
	console.log("Current State: " + st);
	
	for(var b=0; b<s.emitters.length; b++){
		if(s.emitters[b].draw == "false") {
			break;
		} else {
			var ps = s.emitters[b];
			systems.unshift(new particleSystem(new vec(+ps.x,+ps.y), +ps.numParts));
		}
	}

	for(var c=0; c<s.forceList.length; c++){
		if(s.forceList[c].add == "false") {
			break;
		} else {
			for(var d=0; d<systems.length; d++){
				systems[d].forces.push(new vec(+s.forceList[c].x, +s.forceList[c].y));
			}
		}
	}

	for(var e=0; e<s.attractors.length; e++){
		var att = s.attractors[e];
		if(att.add == "false") {
			break;
		}
		else {
			for(var f=0; f<systems.length; f++){
				systems[f].attractors.push(new attractor(new vec(+att.x, +att.y), +att.mass, +att.G));
			}
		}
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