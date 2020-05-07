//==========================================
// DECLARING VARIABLES
//==========================================
// HTML things
var canvas = document.getElementById("canvas"),
    sampleObjectCanvas = document.getElementById("sampleObject");
var canvasCtx, // main canvas context
	sampleObjetcCtx;

// constants
var width,
	height;
var fps;
var hudFontSize,
	hudFont;
const constEraser = 0,
	constBlock = 1,
	constEnemy = 2,
	constPlayer = 3;

// variables
var gridX,
	gridY,
	gridWidth,
	gridHeight;
var mouseX = 0,
	mouseY = 0;
var backgroundColor;
var selectedObject = constBlock;

// booleans
var click,
	rightClick,
	displayedGrid,
	playing;

// objects
var clouds = [],
	blocks = [],
	enemys = [],
	sampleObject = [],
	player = [],
	board;

function initializeEverything() {
	// constants
    canvasCtx = canvas.getContext("2d");
	sampleObjetcCtx = sampleObjectCanvas.getContext("2d");
	width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
	sampleObjectCanvas.width = (width > height? height : width)/7;
	sampleObjectCanvas.height = sampleObjectCanvas.width;
    fps = 60;
    hudFontSize = (width<height ? width: height)/10;
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

	// booleans
    playing = rightClick = click = false;
	displayedGrid = true;
	
	// objects
	board = new Board();
	for(let i=0; i < 6; i++)
	    clouds.push(new Cloud({}));
	var json = {
		x: sampleObjectCanvas.width/6,
		y: sampleObjectCanvas.width/6,
		width: sampleObjectCanvas.width/3*2,
		height: sampleObjectCanvas.width/3*2,
		specialObject: true,
	};
	for(let i=0; i <= constPlayer; i++) {
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
		}
	}
}
//==========================================
// OBJECTS
//==========================================
class Eraser {
	constructor(json) {
		this.name = 'eraser';
		this.width = json.width || gridWidth;
		this.height = json.width || gridHeight;
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.color = json.color || "#F87";
		this.bottomColor = json.bottomColor || "#58C";
		
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvasCtx = this.canvas.getContext('2d');
		this.updateCanvas();
	}
	updateCanvas() {
		this.canvasCtx.fillStyle = this.color;
		drawRoundedRect({x:0, y:0, width:this.width, height:this.height, borderRadius:this.width/6}, this.canvasCtx);
		this.canvasCtx.fillStyle = this.bottomColor;
		drawRoundedRect({x:0, y:this.height/3*2, width:this.width, height:this.height/3, borderRadius:this.width/6}, this.canvasCtx);
		drawRect({x:0, y:this.height/3*2, width:this.width, height:this.height/6}, this.canvasCtx);
	}
	draw(ctx) {
		ctx.drawImage(this.canvas, this.x, this.y);
	}
}

class Block {
	constructor(json) {
		this.name = 'block';
		this.width = json.width || gridWidth;
		this.height = json.width || gridHeight;
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.floatY = this.y;
		this.floatX = this.x;
		this.color = json.color || "#550";
		this.grassColor = json.grassColor || "#0A0";
		
		destroyObject(this.x, this.y);

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvasCtx = this.canvas.getContext('2d');
		this.updateCanvas();
		
		if(!json.specialObject)
			blocks.push(this);
	}
	
	updateCanvas() {
		this.canvasCtx.fillStyle = this.color;
		drawRect({x:0, y:0, width:this.width, height:this.height,}, this.canvasCtx);
		this.canvasCtx.fillStyle = this.grassColor;
		drawRect({x:0, y:0, width:this.width, height:this.height/3,}, this.canvasCtx);
	}
	
	draw(ctx) {
		ctx.drawImage(this.canvas, this.x, this.y);
	}
	
	getRect() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
		}
	}
}

class Enemy {
	constructor(json) {
		this.name = 'enemy';
		this.width = json.width || gridWidth;
		this.height = json.width || gridHeight;
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.eyesX = this.width/2;
		this.eyesY = this.height/4;
		this.floatY = this.y;
		this.floatX = this.x;
		this.color = json.color || "#A00";
		this.eyesColor = json.eyesColor || "#FFF";
		
		destroyObject(this.x, this.y);

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvasCtx = this.canvas.getContext('2d');
		this.updateCanvas();

		if(!json.specialObject)
			enemys.push(this);
	}
	
	updateCanvas() {
		this.canvasCtx.fillStyle = this.color;
		drawRect({x:0, y:0, width:this.width, height:this.height,}, this.canvasCtx);
		this.canvasCtx.fillStyle = this.eyesColor;
		drawRect({x:this.eyesX, 				y:this.eyesY, width:this.width/6, height:this.height/2,}, this.canvasCtx);
		drawRect({x:this.eyesX+this.width/3, 	y:this.eyesY, width:this.width/6, height:this.height/2,}, this.canvasCtx);
	}
	
	draw(ctx) {
		ctx.drawImage(this.canvas, this.x, this.y);
	}
	
	move() {
		if(playing) {
			// hace sus cosas de moverse
		}
		this.moveEyes();
		this.updateCanvas();
	}
	
	moveEyes() {
		if(!playing) {
			
		}
	}

	getRect() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
		}
	}
}

class Player {
	constructor(json) {
		this.name = 'player';
		this.width = json.width || gridWidth;
		this.height = json.width || gridHeight;
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.eyesX = this.width/2;
		this.eyesY = this.height/4;
		this.floatY = this.y;
		this.floatX = this.x;
		this.color = json.color || "#0A0";
		this.eyesColor = json.eyesColor || "#FFF";
		
		destroyObject(this.x, this.y);
		
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvasCtx = this.canvas.getContext('2d');
		this.updateCanvas();
		
		if(!json.specialObject)
			player[0] = this;
	}
	
	updateCanvas() {
		this.canvasCtx.fillStyle = this.color;
		drawRect({x:0, y:0, width:this.width, height:this.height,}, this.canvasCtx);
		this.canvasCtx.fillStyle = this.eyesColor;
		drawRect({x:this.eyesX, 				y:this.eyesY, width:this.width/6, height:this.height/2,}, this.canvasCtx);
		drawRect({x:this.eyesX+this.width/3, 	y:this.eyesY, width:this.width/6, height:this.height/2,}, this.canvasCtx);
	}
	
	draw(ctx) {
		ctx.drawImage(this.canvas, this.x, this.y);
	}
	
	move() {
		if(playing) {
			// hace sus cosas de moverse
		}
		this.moveEyes();
		this.updateCanvas();
	}
	
	moveEyes() {
		if(!playing) {
			
		}
	}

	getRect() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
		}
	}
}

class Cloud {
	constructor(json) {
		this.name = 'cloud';
		let tam = width < height ? width : height;
		this.width = json.width || tam/4+Math.random()*tam/4;
		this.height = json.height || this.width/2+Math.random()*this.width/4;
		this.x = json.x || Math.random()*width;
		this.floatX = this.x;
		this.y = json.y || Math.random()*height/3 - this.height;
		this.color = json.color || "#FFF";
		this.speed = json.speed || Math.max(1, Math.random()*3);
		
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvasCtx = this.canvas.getContext('2d');
		this.createCloudImage(true);
	}
	
	createCloudImage(firstCall) {
		var tam = width < height ? width : height;
			if(!firstCall) {
			this.width = tam/4+Math.random()*tam/4;
			this.height = this.width/2+Math.random()*this.width/4;
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			clearCanvas(this.canvas);
		}
		
		let extraTam = tam / Math.max(1, this.width - tam/4);
		var circles = (extraTam < 6) ? 7 : (extraTam < 12) ? 5 : 3;
		if(circles === 7)
			this.height = this.canvas.height = Math.max(this.width / 2, this.height/2); // reduce a lot the 7 circles clouds' height
		else if(circles === 5)
			this.height = this.canvas.height = Math.max(this.width / 2, this.height * 5/6); // reduce a little the 5 circles clouds' height
		var radius = this.width/circles/2;
		this.canvasCtx.fillStyle = this.color;
		for(let i = 0; i < 2; i++) {
			for(let j = 0; j < circles; j++) {
				let y = radius;
				var difference = Math.abs(Math.floor(circles/2) - j);
				if(i == 0) {
					if(j!= Math.floor(circles/2) && circles % 2 == 1)
						if(circles % 2 == 1)
							y+= radius/4 * Math.pow(difference, 1.8);
				}
				else {
					y = this.height - radius;
					if(j!= Math.floor(circles/2))
						y-= radius/4 * Math.pow(difference, 1.8);
				}
				let json = {
					x: radius*2 + j*(this.width - 4*radius)/(circles-1),
					y: y,
					radius: radius,
				};
				drawCircle(json, this.canvasCtx);
			}
		}
		if(this.width / this.height < 1.9) {
			let leftCircle = {
				x: radius*4/3,
				y: this.height / 2,
				radius: radius,
			};
			drawCircle(leftCircle, this.canvasCtx);
			let rightCircle = {
				x: this.width - radius*4/3,
				y: this.height / 2,
				radius: radius,
			};
			drawCircle(rightCircle, this.canvasCtx);
		}
		if(circles < 7)
			drawRect({x: radius*1.3, y: radius*1.3, width: this.width-radius*2.6, height: this.height-radius*2.6}, this.canvasCtx);
		else {
			drawRect({x: radius*4, y: radius*1.5, width: this.width-radius*8, height: this.height-radius*3}, this.canvasCtx);
			drawRect({x: radius*2, y: radius*2.5, width: this.width-radius*4, height: this.height-radius*5}, this.canvasCtx);
		}
	}
	
	move() {
		if(this.x < -this.width) {
			this.floatX = width;
			this.y = Math.min(this.height/3, Math.random()*height/3 - this.height);
			this.speed = 1 + Math.random()*3;

			// reset the canvas
			this.createCloudImage();
		}
		
		this.floatX-=this.speed;
		this.x = this.floatX;
	}
	
	draw(ctx) {
		ctx.globalAlpha = ".80";
		ctx.drawImage(this.canvas, this.x, this.y);
		ctx.globalAlpha = "1";
	}
	
	getRect() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
		}
	}
}

class Board {
	constructor() {
		// variables and constants
		this.name = 'board';
		this.topHeight = (width > height? height : width)/3;
		this.bottomHeight = (width > height? height : width)/6;
		this.displayed = false;
		this.font = this.bottomHeight/3 + "px sans-serif";
		
		// buttons and things idk
			// top things
			let arrowSize = this.topHeight / 2;
			let displayedBoardSampleObjectBoxSize = 3 * this.topHeight / 4;
			this.closeBoard = {
				x: this.topHeight/24,
				y: this.topHeight/24,
				width: this.topHeight/4,
				height: this.topHeight/4,
				color: "#FFF",
			};
			this.displayedBoardSampleObjectBox = {
				x: (width - displayedBoardSampleObjectBoxSize) / 2,
				y: (this.topHeight - displayedBoardSampleObjectBoxSize) / 2,
				width: displayedBoardSampleObjectBoxSize,
				height: displayedBoardSampleObjectBoxSize,
				borderRadius: displayedBoardSampleObjectBoxSize/5,
			};
			let displayedBoardSampleObjectImageSize = 2 * this.displayedBoardSampleObjectBox.width/3;
			this.displayedBoardSampleObjectImage = {
				x: (width - displayedBoardSampleObjectImageSize)/2,
				y: (this.topHeight - displayedBoardSampleObjectImageSize) / 2,
				width: displayedBoardSampleObjectImageSize,
				height: displayedBoardSampleObjectImageSize
			};
			this.leftArrow = {
				x: this.displayedBoardSampleObjectBox.x - arrowSize/4,
				y: (this.topHeight - arrowSize) / 2,
				width: -arrowSize,
				height: arrowSize
			};
			this.rightArrow = {
				x: this.displayedBoardSampleObjectBox.x + this.displayedBoardSampleObjectBox.width + arrowSize/4,
				y: (this.topHeight - arrowSize) / 2,
				width: arrowSize,
				height: arrowSize
			};
			
			// bottom things
			this.gridButton = {
				x: (width - this.bottomHeight/6*5) / 2,
				y: height - this.bottomHeight/6*5,
				width: this.bottomHeight/3*2,
				height: this.bottomHeight/3*2,
				turnedOnColor: "#FFF",
				turnedOffColor: "#98B"
			}
			this.gridYButtom = {
				x: this.gridButton.x + this.bottomHeight,
				y: height - this.bottomHeight/6*5,
				width: this.bottomHeight,
				height: this.bottomHeight/3*2,
				borderRadius: this.bottomHeight/6,
				color: "#FFF",
			}
			this.gridXButtom = {
				x: this.gridButton.x - this.bottomHeight/3*4,
				y: height - this.bottomHeight/6*5,
				width: this.bottomHeight,
				height: this.bottomHeight/3*2,
				borderRadius: this.bottomHeight/6,
				color: "#FFF",
			}
			
			// undisplayed board things
			this.undisplayedBoardSampleObjectBox = { // this one is not drawn in the main canvas, but it is in the sampleObjectCanvas
				x: 0, // so, this is 0 in the sampleObjectCanvas, but it is actually sampleObjectCanvas.width/5 on the main canvas
				y: 0,
				width: sampleObjectCanvas.width,
				height: sampleObjectCanvas.height,
				borderRadius: sampleObjectCanvas.width/4,
				color: "#FFF",
			};

	}
	
	draw(ctx) {
		if(this.displayed) {
			this.drawBoard(ctx);
		}
		else {
			sampleObjetcCtx.fillStyle = this.undisplayedBoardSampleObjectBox.color;
			drawRoundedRect(this.undisplayedBoardSampleObjectBox, sampleObjetcCtx);
			sampleObject[selectedObject].draw(sampleObjetcCtx);
			ctx.globalAlpha = ".5";
			let position = sampleObjectCanvas.width/5;
			ctx.drawImage(sampleObjectCanvas, position, position);
			ctx.globalAlpha = "1";
		}
	}
	
	drawBoard(ctx) {
		// purple background
		ctx.fillStyle = "#A58FFF";
		let topRect = {
			x: 0,
			y: 0,
			width: width,
			height: this.topHeight
		};
		drawRect(topRect, ctx);
		let bottomRect = {
			x: 0,
			y: height - this.bottomHeight,
			width: width,
			height: this.bottomHeight
		};
		drawRect(bottomRect, ctx);
		
		// top things
			// close buttom
			ctx.fillStyle = this.closeBoard.color;
			drawCircle(this.closeBoard, ctx);
			ctx.lineWidth = Math.max(1, width/180);
			ctx.strokeStyle = "#800";
			let crossedLine = {
				x1: this.closeBoard.x + this.closeBoard.width/4,
				y1: this.closeBoard.y + this.closeBoard.height/4,
				x2: this.closeBoard.x + this.closeBoard.width/4*3,
				y2: this.closeBoard.y + this.closeBoard.height/4*3,
			};
			drawLine(crossedLine, ctx);
			drawLine(crossedLine.x2, crossedLine.y1, crossedLine.x1, crossedLine.y2, ctx);
			
			// white box
			ctx.fillStyle = "#FFF";
			drawRoundedRect(this.displayedBoardSampleObjectBox, ctx);
			
			// object image
			ctx.drawImage(sampleObject[selectedObject].canvas,
				this.displayedBoardSampleObjectImage.x,
				this.displayedBoardSampleObjectImage.y,
				this.displayedBoardSampleObjectImage.width,
				this.displayedBoardSampleObjectImage.height
			);
			
			// arrows
			ctx.fillStyle = "#845FCC";
			drawTriangle(this.rightArrow, ctx);
			drawTriangle(this.leftArrow, ctx);
		
		// bottom things
			// grid buttom
			ctx.fillStyle = displayedGrid ? this.gridButton.turnedOnColor : this.gridButton.turnedOffColor;
			drawCircle(this.gridButton, ctx);
			//drawRoundedRect(this.gridButton, ctx);
			ctx.lineWidth = Math.max(1, width/400);
			ctx.strokeStyle = "#000";
			let horizontalLine = {
				x1: this.gridButton.x+this.gridButton.width/3,
				y1: this.gridButton.y+this.gridButton.height/6,
				x2: this.gridButton.x+this.gridButton.width/3,
				y2: this.gridButton.y+this.gridButton.height/6*5,
			}
			drawLine(horizontalLine, ctx);
			drawLine(horizontalLine.x1 + this.gridButton.width/3, horizontalLine.y1, horizontalLine.x2 + this.gridButton.width/3 , horizontalLine.y2, ctx);
			let verticalLine = {
				x1: this.gridButton.x+this.gridButton.width/6,
				y1: this.gridButton.y+this.gridButton.height/3,
				x2: this.gridButton.x+this.gridButton.width/6*5,
				y2: this.gridButton.y+this.gridButton.height/3,
			}
			drawLine(verticalLine, ctx);
			drawLine(verticalLine.x1, verticalLine.y1 + this.gridButton.height/3, verticalLine.x2 , verticalLine.y2 + this.gridButton.height/3, ctx);
			
			// grid buttoms
			ctx.fillStyle = this.gridYButtom.color;
			drawRoundedRect(this.gridYButtom, ctx);
			drawRoundedRect(this.gridXButtom, ctx);
			ctx.fillStyle = "#640999";
			ctx.font = this.font;
			drawString(this.gridXButtom.x + this.bottomHeight/10, this.gridXButtom.y + this.gridXButtom.height/3*2, 'X: '+gridX, ctx);
			drawString(this.gridYButtom.x + this.bottomHeight/10, this.gridYButtom.y + this.gridYButtom.height/3*2, 'Y: '+gridY, ctx);
	}
}

function destroyObject(x, y) {
	blocks.forEach( (block, i) => {
		if(block.x === x && block.y === y)
			blocks.splice(i, 1);
	});
	enemys.forEach( (enemy, i) => {
		if(enemy.x === x && enemy.y === y)
			enemys.splice(i, 1);
	});
	player.forEach( (p, i) => {
		if(p.x === x && p.y === y)
			player.splice(i, 1);
	});
}

//==========================================
// DRAW FUNCTIONS
//==========================================
function clearCanvas(clearedCanvas) {
	let ctx = clearedCanvas.getContext('2d');
	// Store the current transformation matrix
	ctx.save();
	
	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, clearedCanvas.x, clearedCanvas.height);
	
	// Restore the transform
	ctx.restore();
}

function drawBackground(ctx) {
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, width, height);
}

function drawRect(rect, ctx) {
	ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

function drawString(arg1, arg2, arg3, ctx) {
	var x, y, text;
	if(typeof arg1 == "object") {
		x = arg1.x;
		y = arg1.y;
		text = arg1.string || arg1.text;
		ctx = arg2;
	}
	else {
		x = arg1;
		y = arg2;
		text = arg3;
	}
	ctx.fillText(text, x, y);
}

function drawLine(arg1, arg2, arg3, arg4, ctx) {
	var x1, x2, y1, y2;
	if(typeof arg1 === "object") {
		ctx = arg2;
		x1 = arg1.x1;
		y1 = arg1.y1;
		x2 = arg1.x2;
		y2 = arg1.y2;
	}
	else {
		x1 = arg1;
		y1 = arg2;
		x2 = arg3;
		y2 = arg4;
	}
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawCircle(obj, ctx) {
	var x, y, radius;
	if(typeof obj.width != "undefined") {
		x = obj.x + obj.width/2;
		y = obj.y + obj.height/2;
		radius = obj.width/2;
	}
	else {
		x = obj.x;
		y = obj.y;
		radius = obj.radius;
	}
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2*Math.PI);
	ctx.fill();
}

function drawGrid(ctx) {
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 1;
	for(let x = 1; x < gridX; x++) {
		drawLine(x*gridWidth, 0, x*gridWidth, height, ctx);
	}
	for(let y = 1; y < gridY; y++) {
		drawLine(0, y*gridHeight, width, y*gridHeight, ctx);
	}
}

function drawTriangle(obj, ctx) {
	/*
		this boy accept two forms: a rectangle and a primitive triangle
		Examples:
			drawTriangle({blocks[2]}, canvasCtx) // it will draw a triangle inside that block object
			drawTriangle({x: 0, y: 200, width: 100, height, 100}, canvasCtx) // it will draw a triangle in the (x, y) coordinates with the given width and height
			drawTriangle({x1: 60, y1: 20, x2: 40, y2: 80, x3: 50, y3: 50}, canvasCtx) // it will draw a triangle with the exact given points
	*/
    ctx.beginPath();
    ctx.moveTo(obj.x1 || obj.x, 			obj.y1 || obj.y);
    ctx.lineTo(obj.x2 || obj.x + obj.width,	obj.y2 || obj.y + obj.height/2);
    ctx.lineTo(obj.x3 || obj.x, 			obj.y3 || obj.y + obj.height);
    ctx.closePath();
    ctx.fill();
}

function drawRoundedRect(obj, ctx) {
	ctx.beginPath();
	let borderRadius = obj.borderRadius || width/gridX/4;
	ctx.moveTo(obj.x + borderRadius, obj.y);
	ctx.lineTo(obj.x + obj.width - borderRadius, obj.y);
	ctx.quadraticCurveTo(obj.x + obj.width, obj.y, obj.x + obj.width, obj.y + borderRadius);
	ctx.lineTo(obj.x + obj.width, obj.y + obj.height - borderRadius);
	ctx.quadraticCurveTo(obj.x + obj.width, obj.y + obj.height, obj.x + obj.width - borderRadius, obj.y + obj.height);
	ctx.lineTo(obj.x + borderRadius, obj.y + obj.height);
	ctx.quadraticCurveTo(obj.x, obj.y + obj.height, obj.x, obj.y + obj.height - borderRadius);
	ctx.lineTo(obj.x, obj.y + borderRadius);
	ctx.quadraticCurveTo(obj.x, obj.y, obj.x + borderRadius, obj.y);
	ctx.fill();
}

function render() {
	drawBackground(canvasCtx);
	clouds.forEach( cloud => {
		cloud.move();
		cloud.draw(canvasCtx);
	});
	
	blocks.forEach( (block, i) => {
		block.draw(canvasCtx);
	});
	enemys.forEach( enemy => {
		enemy.draw(canvasCtx);
	});
	player.forEach( p => {
		p.draw(canvasCtx);
	});
	
	if(displayedGrid)
		drawGrid(canvasCtx);
	
	board.draw(canvasCtx);
}

//==========================================
// GAME EVENTS
//==========================================
// touch events
canvas.addEventListener('touchstart', touch => {
	var x = touch.changedTouches[0].clientX,
		y = touch.changedTouches[0].clientY;
	mouseX = x;
	mouseY = y;
	click = true;
	clicking();
});

canvas.addEventListener('touchmove', touch => {
	var x = touch.changedTouches[0].clientX,
		y = touch.changedTouches[0].clientY;
	mouseX = x;
	mouseY = y;
	click = true;
});

canvas.addEventListener('touchend', touch => {
	click = rightClick = false;
});

// disabling the right click menu
canvas.addEventListener("contextmenu", ctxM => {
	ctxM.preventDefault();
});

// mouse events
canvas.addEventListener("mousedown", md => {
	if(!board.displayed) {
		let sampleObjectButtom = {
			x: sampleObjectCanvas.width/5,
			y: sampleObjectCanvas.height/5,
			width: board.undisplayedBoardSampleObjectBox.width,
			height: board.undisplayedBoardSampleObjectBox.height,
		}
		if(pointCollision(md.x, md.y, sampleObjectButtom)) {
			board.displayed = !board.displayed;
			return;
		}
	}
	else {
		if(pointCollision(md.x, md.y, board.closeBoard)) {
			board.displayed = !board.displayed;
			return;
		}
		if(pointCollision(md.x, md.y, board.leftArrow)) {
			leftArrowFunction();
			return;
		}
		if(pointCollision(md.x, md.y, board.rightArrow)) {
			rightArrowFunction();
			return;
		}
		if(pointCollision(md.x, md.y, board.gridButton)) {
			displayedGrid = !displayedGrid;
			return;
		}
		if(pointCollision(md.x, md.y, board.displayedBoardSampleObjectBox)) {
			board.displayed = !board.displayed;
			return;
		}
		if(pointCollision(md.x, md.y, board.gridYButtom)) {
			setGridY();
			return;
		}
		if(pointCollision(md.x, md.y, board.gridXButtom)) {
			setGridX();
			return;
		}
	}
	if(md.which == 1 || md.which == 3) {
		click = true;
		if(md.which == 3)
			rightClick = true;
	}
	clicking();
});

canvas.addEventListener("mouseup", mu => {
	click = rightClick = false;
})

canvas.addEventListener("mousemove", mm => {
	mouseX = mm.x;
	mouseY = mm.y;
})

// key events, if the user have a keyboard
window.addEventListener("keydown", key => {
	console.log(key.keyCode);
	if(key.keyCode == 27) { // Escape
		board.displayed = !board.displayed;
		return;
	}
	if(key.keyCode == 71) { // G key
		displayedGrid = !displayedGrid;
		return;
	}
	if(key.keyCode == 37) { // Left arrow
		leftArrowFunction();
		return;
	}
	if(key.keyCode == 39) { // Right arrow
		rightArrowFunction();
		return;
	}
	if(key.keyCode == 88) { // Right arrow
		setGridX();
		return;
	}
	if(key.keyCode == 89) { // Right arrow
		setGridY();
		return;
	}
});

//==========================================
// GAME THINGS
//==========================================
function deleteEverything() {
	player.splice(0, player.length);
	blocks.splice(0, blocks.length);
	enemys.splice(0, enemys.length);
}

function leftArrowFunction() {
	if(selectedObject <= 0)
		selectedObject = sampleObject.length - 1; // el máximo, de momento
	else
		selectedObject--;
}
function rightArrowFunction() {
	if(selectedObject >= sampleObject.length - 1) // el máximo, de momento
		selectedObject = 0;
	else
		selectedObject++;
}

function clicking() {
	if((mouseY > board.topHeight && mouseY < height - board.bottomHeight) || !board.displayed)
	if(click) {
		let x = mouseX - mouseX % gridWidth,
			y = mouseY - mouseY % gridHeight;
		destroyObject(x, y);
		if(!rightClick) {
			switch(selectedObject) {
				case constBlock:
					new Block({
						x: x,
						y: y
					});
					break;
				case constEnemy:
					new Enemy({
						x: x,
						y: y
					});
					break;
				case constPlayer:
					new Player({
						x: x,
						y: y
					});
					break;
				default:
					console.log('No object selected.');
					break;
			}
		}
	}
}

function collides(obj1, obj2) {
  let x11 = obj1.x,
    y11 = obj1.y,
    x12 = obj1.x + obj1.width,
    y12 = obj1.y + obj1.height,
    x21 = obj2.x,
    y21 = obj2.y,
    x22 = obj2.x + obj2.width,
    y22 = obj2.y + obj2.height;
  if((x11 >= x21 && x11 <= x22)
  || (x12 >= x21 && x12 <= x22)) {
    if(y11==y21 || y11==y22
    || y12==y21 || y12==y22)
      return true;
    if((y12 > y21 && y12 < y22)
    || (y11 > y21 && y11 < y22))
      return true;
    }
  return false;
}

function pointCollision(x, y, rect) {
	if(rect.width >= 0)
		return (x>=rect.x && x<=rect.x+rect.width
			&& y>=rect.y && y<=rect.y+rect.height);
	else // this one is for the leftArrow
		return (x>=rect.x+rect.width && x<=rect.x
			&& y>=rect.y && y<=rect.y+rect.height)
}

function setGridX(num) {
	let answer = prompt('Are you sure you want to change the grid properties? You\'ll lose your advance. \nType \"yes\" if you accept this');
	if(typeof answer != 'string')
		return;
	else {
		if(answer != "yes")
			return;
	}
	let n = (typeof num == 'undefined') ? prompt('Type how much horizontal cells you want ') : num;
	if(typeof n == 'string' || typeof n == 'number') {
		if(isNaN(n)) {
			alert('That\'s not a number, it won\'t work');
			return;
		}
		gridX = n;
		gridWidth = Math.ceil(width / gridX);
		deleteEverything();
	}
}

function setGridY(num) {
	let answer = prompt('Are you sure you want to change the grid properties? You\'ll lose your advance. \nType \"yes\" if you accept this');
	if(typeof answer != 'string')
		return;
	else {
		if(answer != "yes")
			return;
	}
	let n = (typeof num == 'undefined') ? prompt('Type how much vertical cells you want ') : num;
	if(typeof n == 'string' || typeof n == 'number') {
		if(isNaN(n)) {
			alert('That\'s not a number, it won\'t work');
			return;
		}
		gridY = n;
		gridHeight = Math.ceil(height / gridY);
		deleteEverything();
	}
}

function loop() {
	enemys.forEach( enemy => {
		enemy.move();
	})
	player.forEach( p => {
		p.move();
	})
	clicking();
	
	// you need to canvasCtx the changes 8]
	render();
}

//==========================================
// IIFE
//==========================================
;(function() {
    initializeEverything();
    setInterval(loop, 1000/fps);
})();