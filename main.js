var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

var w = window.innerWidth/2, h = window.innerHeight/2;
var center = new vec(w/2,h/2);
var system = new particleSystem(center, 0, false);
var st = 0;
var lastLoop = new Date;


window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas(){
	w = can.width = window.innerWidth;
	h = can.height = window.innerHeight;
	center = new vec(w/2,h/2);
	if(st === 0){
		system = new particleSystem(center, 0, false);
		return;
	}
	system.updateCenter(center);
}

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
			system.outOfBoundsAndDie = false;
			system.attractAllBoolean = true;
			system.collideAndDie = true;
			break;
		case 4:
			system.colours = 1;
			system.collideAndDie = false;
			system.attractors.push(new attractor(center, 5, 500));
			break;
		case 5:
			system.updateCenter(center);
			system.limit = 100;
			if(system.particles.length<100){
				system.addBatchParticles();
			}
			break;
		case 6:
			system.updateCenter(center);
			system.limit = 200;
			if(system.particles.length<system.limit){
				system.addBatchParticles();
			}
			break;
		default:
			console.log("De FAULTING");
	}
	st++;
}

function setup(){
	resizeCanvas();
	hide("startButton");
	setState(st);
	show("stateButton");
	can.setAttribute("onclick","setState(st)");
}

function draw() {
	if(st === 0) resizeCanvas();
	var thisLoop = new Date;
	var fps = Math.floor(1000/(thisLoop - lastLoop));
  	ctx.fillStyle = "black";
 	ctx.fillRect(0, 0, w, h);
 	updateParticleSystem();
 	document.getElementById("pl").innerHTML = "Particle Count: " + system.particles.length;
 	document.getElementById("fps").innerHTML = "FPS: " + fps;
 	lastLoop = thisLoop;
}

setInterval(draw, 30);