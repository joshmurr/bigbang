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
	var text2 = document.getElementById("text2");
	console.log("Current State: " + st);
	switch(state){
		case 0:
			text.style.fontSize = "18px";
			text2.style.fontSize = "18px";
			text.innerHTML = "It all starts with a LOT of energy in a small amount of space";
			text.style.width = "350px";
			text.style.border = "none";
			text.style.marginTop = "550px";
			system.attractors.push(new attractor(new vec(center.x+1, center.y), 5, 500));
			system.limit = 1;
			break;
		case 1:
			text.style.top = "-180px";
			text.innerHTML = "&uarr;<br>All Energy";
			text2.style.top = "-1050px";
			text2.innerHTML = "Nothing<br>&darr;";
			break;
		case 2:
			text.style.top = "0px";
			text.innerHTML = "Unknown, unstable conditions means the energy can no logner be contained...";
			text2.style.top = "-1050px";
			text2.innerHTML = "The BIG BANG";
			system.attractors = [];
			system.colours = 0;
			system.limit = 100;
			system.keepEmitting = true;
			break;
		case 3:
			text2.innerHTML = "";
			text.innerHTML = "Energy fills space and time at extremely high speeds"
			break;
		case 4:
			text.innerHTML = "At such high temperatures and speeds, energy can turn into mass";
			text2.innerHTML = "E = MC^2";
			break;
		case 5:
			text2.innerHTML = "";
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
			text.innerHTML = "Gravity causes the particles with mass to attract one another and interact";
			system.updateCenter(center);
			system.limit = 100;
			if(system.particles.length<100){
				system.addBatchParticles(5);
			}
			break;
		case 10:
			text.innerHTML = "Systems begin to emerge which have an overall gravitational pull";
			system.attractors = [];
			system.attractors.push(new attractor(new vec(Math.random()*w, Math.random()*h), 5, 500));
			system.attractors.push(new attractor(new vec(Math.random()*w, Math.random()*h), 5, 500));
			system.updateCenter(center);
			system.limit = 200;
			if(system.particles.length<system.limit){
				system.addBatchParticles(2);
			}
			break;
		case 11:
			text.innerHTML = "These systems go on to become larger systems like stars";
			system.attractors = [];
			system.colours = 3;
			system.updateCenter(center);
			system.colours = 100;
			break;
		case 12:
			text.innerHTML = "Floating through space, part of a bigger system"
			system.limit = 100;
			system.keepEmitting = true;
			break;
		case 13:
			text.innerHTML = "We call the universe, and the world we live on..."
			break;
		case 14:
			text.innerHTML = "";
			break;
		case 15:
			text.innerHTML = "Made by Josh Murr"
			text2.innerHTML = "The BIG BANG";
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