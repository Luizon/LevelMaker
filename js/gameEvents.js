import { Block } from "./objects/Block.js";
import { Board } from "./objects/Board.js";
import { Cloud } from "./objects/Cloud.js";
import { Enemy } from "./objects/Enemy.js";
import { Eraser } from "./objects/Eraser.js";
import { Player } from "./objects/Player.js";
import { SpikesBlock } from "./objects/SpikesBlock.js";
import { setGridX, setGridY } from "./engineFunctions.js";

// resize window
window.onresize = updateEverything;

export function initializeEverything() {
	// constants
	fileInput.accept = '.lm';
    canvasCtx = canvas.getContext("2d");
	sampleObjetcCtx = sampleObjectCanvas.getContext("2d");
	width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
	sampleObjectCanvas.width = (width > height? height : width)/7;
	sampleObjectCanvas.height = sampleObjectCanvas.width;
    //fps = 60;
    hudFontSize = (width < height ? width : height)/10;
    hudFont = hudFontSize + "px Arial";

	// variables
	if(height < width) {
		gridX = 16;
		gridY = Math.round(height / Math.ceil(width / gridX));
	}
	else {
		gridY = 16;
		gridX = Math.round(width / Math.ceil(height / gridY));
	}
    backgroundColor = "#8CF";
	gridWidth = Math.ceil(width / gridX);
	gridHeight = Math.ceil(height / gridY);
	deletedObjectPoint = {x:-width, y:-width}

	// booleans
    playing = rightClick = click = leftKey = rightKey = upKey = alt = control = false;
	displayedGrid = true;
	
	// objects
	board = new Board();
	let cloudsLength = Math.floor(width / height * 10)
	for(let i=0; i < cloudsLength; i++)
	    clouds.push(new Cloud({}));
	var json = {
		x: sampleObjectCanvas.width/6,
		y: sampleObjectCanvas.width/6,
		width: sampleObjectCanvas.width/3*2,
		height: sampleObjectCanvas.width/3*2,
		specialObject: true,
	};
	for(let i=0; i <= constSpikesBlock; i++) {
		switch(i) {
			case constEraser:
				sampleObject.push(new Eraser(json));
				break;
			case constBlock:
				sampleObject.push(new Block(json));
				break;
			case constEnemy:
				sampleObject.push(new Enemy(json));
				break;
			case constPlayer:
				sampleObject.push(new Player(json));
				break;
			case constSpikesBlock:
				sampleObject.push(new SpikesBlock(json));
				break;
		}
	}
}

export function updateEverything() {
	width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
	sampleObjectCanvas.width = (width > height? height : width)/7;
	sampleObjectCanvas.height = sampleObjectCanvas.width;
    hudFontSize = (width < height ? width : height)/10;
    hudFont = hudFontSize + "px Arial";
	
	// save current objects
	enemies.forEach( e => {
		e.x = e.xInit;
	});
	player.forEach( p => {
		p.x = p.xInit;
		p.y = p.yInit;
	});
	let objectsState = objectsStateToJSON();
	blocks.length = 0;
	enemies.length = 0;
	player.length = 0;
	spikesBlocks.length = 0;

	// variables
	gridWidth = Math.ceil(width / gridX);
	gridHeight = Math.ceil(height / gridY);

	// objects
	board = new Board();
	let cloudsLength = Math.floor(width / height * 10)
	clouds.length = 0;
	for(let i=0; i < cloudsLength; i++)
	    clouds.push(new Cloud({}));
	let json = {
		x: sampleObjectCanvas.width/6,
		y: sampleObjectCanvas.width/6,
		width: sampleObjectCanvas.width/3*2,
		height: sampleObjectCanvas.width/3*2,
		specialObject: true,
	};
	sampleObject.length = 0;
	for(let i=0; i <= constSpikesBlock; i++) {
		switch(i) {
			case constEraser:
				sampleObject.push(new Eraser(json));
				break;
			case constBlock:
				sampleObject.push(new Block(json));
				break;
			case constEnemy:
				sampleObject.push(new Enemy(json));
				break;
			case constPlayer:
				sampleObject.push(new Player(json));
				break;
			case constSpikesBlock:
				sampleObject.push(new SpikesBlock(json));
				break;
		}
	}
	
	// here the level objects
	loadObjects(objectsState);
}

// load and save level things
export function downloadLevel(fileName = "level.lm") { // save file
	var output = objectsStateToJSON();
	
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(output)], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

export function objectsStateToJSON() {
	var output = [];
	output.push({x: gridX, y: gridY});
	blocks.forEach( (b) => {
		output.push({
			x: Math.floor(b.x/gridWidth),
			y: Math.floor(b.y/gridHeight),
			type: constBlock
		});
	});
	enemies.forEach( (e) => {
		output.push({
			x: Math.floor(e.x/gridWidth),
			y: Math.floor(e.y/gridHeight),
			type: constEnemy
		});
	});
	player.forEach( (p) => {
		output.push({
			x: Math.floor(p.x/gridWidth),
			y: Math.floor(p.y/gridHeight),
			type: constPlayer
		});
	});
	spikesBlocks.forEach( (s) => {
		output.push({
			x: Math.floor(s.x/gridWidth),
			y: Math.floor(s.y/gridHeight),
			type: constSpikesBlock
		});
	});
	return output;
}

export function loadObjects(json) {
	enemyCounter = 0;
	json.forEach( (obj, i) => {
		if(i == 0) {
			setGridX(obj.x, true);
			setGridY(obj.y, true);
		}
		else {
			addObject(obj.x*gridWidth, obj.y*gridHeight, obj.type);
		}
	});
	blocks.forEach( b => {
		//console.log(b);
		b.updateCanvas(true);
	});
}

export function addObject(x, y, object) {
	let obj = false;
	switch(object) {
		case constBlock:
			obj = new Block({
				x: x,
				y: y
			});
			break;
		case constEnemy:
			obj = new Enemy({
				id: ++enemyCounter,
				x: x,
				y: y
			});
			break;
		case constPlayer:
			obj = new Player({
				x: x,
				y: y
			});
			break;
		case constSpikesBlock:
			obj = new SpikesBlock({
				x: x,
				y: y
			});
			break;
	}
	return obj;
}