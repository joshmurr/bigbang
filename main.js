var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

var w = can.width, h = can.height;
var center = new vec(w/2,h/2);
var friction = 0.98;
var st = 0, count = 0;
var lastLoop = new Date;
var system = new particleSystem(center, 0, false);

var states = {
	"states":[
	//ONE//////////////////////////////
	/* Single jittering particle */
	    {"emitters": [
	    	{
	    		"draw": "true",
	    		"keepEmitting": "false",
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
	    		"mass": "500000",
	    		"G": "5000000"
	    	}
	    ]},
	//TWO//////////////////////////////
	/* Lots of emitting particles */
		{"emitters": [
	    	{
	    		"draw": "true",
	    		"keepEmitting": "true",
	    		"numParts": "50",
	    		"x": "250",
	    		"y": "250"
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
	    		"add": "false",
	    		"x": "50",
	    		"y": "50",
	    		"mass": "5",
	    		"G": "200"
	    	}
	    ]},
	//THREE/////////////////////////////
	/* Switch to Blue/Red */
	    {"emitters": [
	    	{
	    		"draw": "false",
	    		"keepEmitting": "false",
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
	    		"add": "false",
	    		"x": "100",
	    		"y": "100",
	    		"mass": "5",
	    		"G": "200"
	    	}
	    ]},
	//FOUR/////////////////////////////
	/* Blue/Red particles attract one another */
	    {"emitters": [
	    	{
	    		"draw": "false",
	    		"keepEmitting": "false",
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
	    		"add": "false",
	    		"x": "400",
	    		"y": "400",
	    		"mass": "5",
	    		"G": "200"
	    	}
	    ]},
	//FIVE////////////////////////////
	/* Left over particles have mass - back to white */
	    {"emitters": [
	    	{
	    		"draw": "false",
	    		"keepEmitting": "false",
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
	    		"x": "100",
	    		"y": "100",
	    		"mass": "5",
	    		"G": "200"
	    	},
	    	{
	    		"add": "true",
	    		"x": "400",
	    		"y": "100",
	    		"mass": "8",
	    		"G": "500"
	    	}
	    ]}
	//SIX////////////////////////////
	/* Left overs begin to attract one another */
	//SEVEN////////////////////////////
	/* Some begin to bunch and form bigger particles */
	//EIGHT////////////////////////////
	/* Bigger parts attracting one another 
	and creating points of gravitational pull */
	//NINE////////////////////////////
	/* Galaxy */
	]
}

function setState(state){
	//CLEAR FORCES
	system.attractors = [];
	console.log("Current State: " + st);
	
	switch(state){
		case 0:
			system.attractors.push(new attractor(new vec(center.x+1, center.y), 5, 500));
			system.limit = 1;
			break;
		case 1:
			system.limit = 50;
			system.keepEmitting = true;
			break;
		case 2:
			system.colours = 0;
			break;
		case 3:
			console.log("ATTRACT ALL!");
			system.attractAllBoolean = true;
			break;
		default:
			console.log("De FAULTING");
	}

	if(st<5) st++;
	else return;
}

function appendValsToHtml(){
	document.getElementById("pl").innerHTML = "Particle Count: " + system.particles.length;
}

function setup(){
	hide("startButton");
	setState(st);
	show("stateButton");
}

function draw() {
	var thisLoop = new Date;
	var fps = Math.floor(1000/(thisLoop - lastLoop));
  	ctx.fillStyle = "black";
 	ctx.fillRect(0, 0, w, h);
 	updateParticleSystem();
 	appendValsToHtml();
 	//if(systems.length>0 && count % 100 === 0) console.log(systems[0].particles[0].location.x);
 	//count++;
 	//console.log(systems.length);
 	document.getElementById("fps").innerHTML = "FPS: " + fps;
 	lastLoop = thisLoop;
}

setInterval(draw, 30);