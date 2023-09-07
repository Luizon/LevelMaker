//==========================================
// INSTANCES
//==========================================
// HTML stuff
var canvas = document.getElementById("canvas"),
    sampleObjectCanvas = document.getElementById("sampleObject");
var canvasCtx, // main canvas context
	sampleObjetcCtx;
var fileInput = document.getElementById("file-input");

// constants
var width,
	height;
var fps = 60;
var hudFontSize,
	hudFont;
const constEraser = 0,
	constBlock = 1,
	constEnemy = 2,
	constPlayer = 3,
	constSpikesBlock = 4;
const constAdd = 0,
	constDelete = 1;
const historyLimit = 300; // amount of objects deleted or added

// variables
var gridX,
	gridY,
	gridWidth,
	gridHeight;
var mouseX = 0,
	mouseY = 0,
	deletedObjectPoint;
var backgroundColor;
var selectedObject = constBlock;

// booleans
var click,
	rightClick,
	leftKey,
	rightKey,
	upKey,
	displayedGrid,
	playing,
	alt,
	control;

// objects
var clouds = [],
	blocks = [],
	enemies = [],
	sampleObject = [],
	player = [],
	spikesBlocks = [],
	board;
var lastActions = []; // {action, object: {x, y, object}}
	
// counters
var enemyCounter = 0;

//==========================================
// OBJECTS
//==========================================

function destroyObject(x, y) {
	let object = false;
	blocks.forEach( (block, i) => {
		if(block.x === x && block.y === y) {
			blocks.splice(i, 1);
			object = {object: constBlock, x: block.x, y: block.y};
		}
	});
	enemies.forEach( (enemy, i) => {
		if(enemy.x === x && enemy.y === y) {
			enemies.splice(i, 1);
			object = {object: constEnemy, x: enemy.x, y: enemy.y};
		}
	});
	player.forEach( (p, i) => {
		if(p.x === x && p.y === y) {
			player.splice(i, 1);
			object = {object: constPlayer, x: p.x, y: p.y};
		}
	});
	spikesBlocks.forEach( (spike, i) => {
		if(spike.x === x && spike.y === y) {
			spikesBlocks.splice(i, 1);
			object = {object: constSpikesBlock, x: spike.x, y: spike.y};
		}
	});
	return object;
}

function getObject(x, y) {
	let object = false;
	blocks.forEach( (block, i) => {
		if(block.x === x && block.y === y) {
			object = {object: constBlock, x: block.x, y: block.y};
		}
	});
	enemies.forEach( (enemy, i) => {
		if(enemy.x === x && enemy.y === y) {
			object = {object: constEnemy, x: enemy.x, y: enemy.y};
		}
	});
	player.forEach( (p, i) => {
		if(p.x === x && p.y === y) {
			object = {object: constPlayer, x: p.x, y: p.y};
		}
	});
	spikesBlocks.forEach( (spike, i) => {
		if(spike.x === x && spike.y === y) {
			object = {object: constSpikesBlock, x: spike.x, y: spike.y};
		}
	});
	return object;
}
