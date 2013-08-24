var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

var w = can.width, h = can.height;
var center = new vec(w/2,h/2);
var friction = 0.98;
var st = 0, count = 0;
var lastLoop = new Date;
var system = new particleSystem(center, 0, false);

function setState(state){
	console.log("Current State: " + st);
	switch(state){
		case 0:
			system.attractors.push(new attractor(new vec(center.x+1, center.y), 5, 500));
			system.limit = 1;
			break;
		case 1:
			system.attractors = [];
			system.limit = 50;
			system.keepEmitting = true;
			break;
		case 2:
			system.colours = 0;
			break;
		case 3:
			system.attractAllBoolean = true;
			system.collideAndDie = true;
			break;
		case 4:
			system.colours = 1;
			system.collideAndDie = false;
			system.attractors.push(new attractor(center, 5, 500));
			break;
		case 5:
			system.limit = 100;
			if(system.particles.length<100){
				system.addBatchParticles();
			}
			break;
		default:
			console.log("De FAULTING");
	}
	st++;
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
 	document.getElementById("fps").innerHTML = "FPS: " + fps;
 	lastLoop = thisLoop;
}

setInterval(draw, 30);