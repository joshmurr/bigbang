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
	var text = document.getElementById("text");
	console.log("Current State: " + st);
	switch(state){
		case 0:
			text.style.fontSize = "18px";
			text.innerHTML = "It all starts with a LOT of energy in a small amount of space";
			system.attractors.push(new attractor(new vec(center.x+1, center.y), 5, 500));
			system.limit = 1;
			break;
		case 1:
			text.innerHTML = "All Energy / Nothing";
			break;
		case 2:
			text.innerHTML = "Unknown, unstable conditions means the energy can no logner be contained. The BIG BANG";
			system.attractors = [];
			system.colours = 0;
			system.limit = 100;
			system.keepEmitting = true;
			break;
		case 3:
			text.innerHTML = "Energy fills space and time at extrememly high speeds"
			break;
		case 4:
			text.innerHTML = "At such high temperatures and speeds, energy can turn into mass [E = MC^2]";
			break;
		case 5:
			text.innerHTML = "Mass is either Matter or Anti-Matter";
			system.colours = 1;
			break;
		case 6:
			text.innerHTML = "Matter and Anti-Matter attract, annihilating one another on collision";
			system.outOfBoundsAndDie = false;
			system.attractAllBoolean = true;
			system.collideAndDie = true;
			break;
		case 7:
			text.innerHTML = "Some particles are left over";
			system.colours = 2;
			system.collideAndDie = false;
			system.attractors.push(new attractor(center, 5, 500));
			break;
		case 8:
			text.innerHTML = "These particles go on to form the building blocks of the universe";
			break;
		case 9:
			
			system.updateCenter(center);
			system.limit = 100;
			if(system.particles.length<100){
				system.addBatchParticles();
			}
			break;
		case 10:
			system.attractors = [];
			system.updateCenter(center);
			system.limit = 200;
			if(system.particles.length<system.limit){
				system.addBatchParticles();
			}
			break;
		case 11:
			system.attractors.push(new attractor(new vec(center.x+1, center.y), 5, 500));
			break;
		default:
			console.log("De FAULTING");
	}
	st++;
}

function setup(){
	resizeCanvas();
	document.getElementById("text").onclick = "";
	setState(st);
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