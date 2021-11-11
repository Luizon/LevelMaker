//==========================================
// DECLARING VARIABLES
//==========================================
// HTML things
var canvas = document.getElementById("canvas"),
    sampleObjectCanvas = document.getElementById("sampleObject");
var canvasCtx, // main canvas context
	sampleObjetcCtx;
var fileInput = document.getElementById("file-input");

// constants
var width,
	height;
var fps;
var hudFontSize,
	hudFont;
const constEraser = 0,
	constBlock = 1,
	constEnemy = 2,
	constPlayer = 3,
	constSpikesBlock = 4;

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
	alt;

// objects
var clouds = [],
	blocks = [],
	enemies = [],
	sampleObject = [],
	player = [],
	spikesBlocks = [],
	board;
	
// counters
var enemyCounter = 0;

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
    playing = rightClick = click = leftKey = rightKey = upKey = false;
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

function updateEverything() {
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
		ctx.drawImage(this.canvas, this.x, this.y, this.width, this.height);
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
		this.updateCanvas(false);
		
		if(!json.specialObject)
			blocks.push(this);
	}
	
	updateCanvas(flag) {
		this.canvasCtx.fillStyle = this.color;
		drawRect({x:0, y:0, width:this.width, height:this.height,}, this.canvasCtx);

		this.canvasCtx.fillStyle = this.grassColor;
		let up = {x: this.x + this.width/4, y:this.y + this.height/4 - this.height};
		if(!blockCollision(this.getReducedRect(up))) // up
			drawRect({x:0, y:0, width:this.width, height:this.height/3}, this.canvasCtx);
		if(!flag)
			return;
		
		let down = {x: this.x + this.width/4, y:this.y + this.height/4 + this.height};
		if(!blockCollision(this.getReducedRect(down))) // down
			drawRect({x:0, y:this.height/4*3, width:this.width, height:this.height/4}, this.canvasCtx);
		let left = {x: this.x + this.width/4 - this.width, y:this.y + this.height/4};
		if(!blockCollision(this.getReducedRect(left))) // left
			drawRect({x:0, y:0, width:this.width/4, height:this.height}, this.canvasCtx);
		let right = {x: this.x + this.width/4 + this.width, y:this.y + this.height/4};
		if(!blockCollision(this.getReducedRect(right))) // right
			drawRect({x:this.width/4*3, y:0, width:this.width/4, height:this.height}, this.canvasCtx);
		
		// corners
		if(blockCollision(this.getReducedRect(up))) {
			if(blockCollision(this.getReducedRect(left))
			&& !blockCollision(this.getReducedRect({x: left.x, y: up.y}))) // up left
				drawRect({x:0, y:0, width:this.width/4, height:this.height/3}, this.canvasCtx);
			if(blockCollision(this.getReducedRect(right))
			&& !blockCollision(this.getReducedRect({x: right.x, y: up.y}))) // up right
				drawRect({x:this.width/4*3, y:0, width:this.width/4, height:this.height/3}, this.canvasCtx);
		}
		if(blockCollision(this.getReducedRect(down))) {
			if(blockCollision(this.getReducedRect(left))
			&& !blockCollision(this.getReducedRect({x: left.x, y: down.y}))) // down left
				drawRect({x:0, y:this.height/4*3, width:this.width/4, height:this.height/4}, this.canvasCtx);
			if(blockCollision(this.getReducedRect(right))
			&& !blockCollision(this.getReducedRect({x: right.x, y: down.y}))) // down right
				drawRect({x:this.width/4*3, y:this.height/4*3, width:this.width/4, height:this.height/4}, this.canvasCtx);
		}
	}
	
	draw(ctx) {
		ctx.drawImage(this.canvas, this.x, this.y, this.width, this.height);
	}
	
	getReducedRect(json) {
		return {
			x: json.x,
			y: json.y,
			width: this.width/2,
			height: this.height/2
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

class Enemy {
	constructor(json) {
		this.id = json.id || 1;
		this.name = 'enemy';
		this.width = json.width || gridWidth;
		this.height = json.width || gridHeight;
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.xInit = json.x || 0;
		this.eyesX = this.width/2;
		this.eyesY = this.height/4;
		this.floatY = this.y;
		this.floatX = this.x;
		this.color = json.color || "#A00";
		this.eyesColor = json.eyesColor || "#FFF";
		this.hspeed = this.width / 15;
		this.direction = 1; // 1 is right -1 is left
		this.alpha = json.alpha || 1;
		this.living = true;
		
		destroyObject(this.x, this.y);

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvasCtx = this.canvas.getContext('2d');
		this.updateCanvas();

		if(!json.specialObject)
			enemies.push(this);
	}
	
	updateCanvas() {
		this.canvasCtx.fillStyle = this.color;
		drawRect({x:0, y:0, width:this.width, height:this.height,}, this.canvasCtx);
		this.canvasCtx.fillStyle = this.eyesColor;
		drawRect({x:this.eyesX, 				y:this.eyesY, width:this.width/6, height:this.height/2,}, this.canvasCtx);
		drawRect({x:this.eyesX+this.width/3, 	y:this.eyesY, width:this.width/6, height:this.height/2,}, this.canvasCtx);
	}
	
	draw(ctx) {
		ctx.globalAlpha = this.alpha;
		ctx.drawImage(this.canvas, this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
	}
	
	move() {
		if(playing && this.living) {
			let hasTurned = false;
			// girar si llega a un borde
				if((this.x + this.width + this.hspeed > width && this.direction > 0)
					|| (this.x - this.hspeed < 0 && this.direction < 0))
					this.direction = -this.direction

			// girar si topa con pared o espinas
				let modifiedRect = {
					x: this.x + this.hspeed*this.direction
				}
				if(blockCollision(this.getRect(modifiedRect)) || spikesCollision(this.getRect(modifiedRect))) {
					this.direction = -this.direction
					hasTurned = true;
				}
				
			// girar si ya no pisa suelo
				if(!hasTurned)
				if(blockCollision(this.getRect({y: this.y + this.height})))
					if(!blockCollision(this.getRect({x: this.x + this.width, y: this.y + this.height, width: this.width - Math.ceil(this.hspeed)}))) {
						if(!blockCollision(this.getRect({x: this.x - this.hspeed*this.direction}) || spikesCollision(this.getRect({x: this.x - this.hspeed*this.direction}))))
						{
							this.direction = -1;
							hasTurned = true;
						}
					}
					else
						if(!blockCollision(this.getRect({x: this.x - this.width + Math.ceil(this.hspeed), y: this.y + this.height, width: this.width - Math.ceil(this.hspeed)}))) {
							this.direction = 1;
							hasTurned = true;
						}
			// girar al chocar con otro enemigo
				enemies.forEach( (other, id) => {
					if(collides(this.getReducedRect(), other.getReducedRect()) && other.id != this.id) {
						other.direction = -other.direction;
						this.direction = -this.direction;
						hasTurned = true;
					}
				})
				
			this.x+= this.direction * this.hspeed;
			this.moveEyes();
		}
		if(!this.living)
			this.alpha = .5;
		else
			this.alpha = 1;
	}
	
	moveEyes() {
		if(playing && this.living) {
			if(this.direction > 0)
				this.eyesX = this.width/2;
			else
				this.eyesX = 0;
			this.updateCanvas();
		}
		else
			this.eyesX = this.width/2;
	}

	getRect(rect) {
		return {
			x: rect.x || this.x,
			y: rect.y + 1 || this.y + 1, // para evitar chocar con techo
			width: rect.width || this.width,
			height: rect.height || this.height - 2, // para evitar chocar con suelo
		}
	}
	
	getReducedRect() {
		let redX = this.width / 6;
		let redY = this.height / 6;
		return {
			x: this.x + redX,
			y: this.y + redY,
			width: this.width - 2*redX,
			height: this.height - 2*redY,
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
		this.xInit = json.x || 0;
		this.yInit = json.y || 0;
		this.hspeed = this.width / 13;
		this.vspeed = 0;
		this.maxVspeed = this.height/3;
		this.gravity = this.height/100;
		this.hasJump = true;
		this.holdJump = true;
		
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
		ctx.drawImage(this.canvas, this.x, this.y, this.width, this.height);
	}
	
	move() {
		if(playing) {
			// gravity system
				let modifiedRect = {
					y: this.y + this.vspeed + 1
				}
				let reducedRect = {
					x: this.x + this.hspeed * this.direction + this.width/5,
					width: this.width - this.width/5*2,
					y: this.y + 1 + this.height/3, //y: this.y + this.height/4,
					height: - 2 + this.height3*2 //height: this.height/4*3 + 1
				}
				if(blockCollision(this.getReducedRect())) {
					blocks.forEach( (b) => {
						if(collides(b, this)) {
							if(b.y > this.y + this.height/2) {
								this.vspeed = 0;
								this.hasJump = this.holdJump = true;
								this.y = this.y - this.y % gridHeight;
							}
							else if(b.y < this.y - this.height/2) {
								this.y = this.y + Math.abs(this.vspeed); //- this.y % gridHeight + gridHeight;
								this.vspeed = 0;
							}
						}
					});
				}
				else {
					if(this.vspeed < this.height/3)
						if(this.holdJump && this.vspeed < 0)
							this.vspeed += this.gravity / 1.6;
						else
							this.vspeed += this.gravity;
					else
						this.vspeed = this.maxVspeed;
				}
			// jump system
				let higherRect = {
					y: this.y - this.height/2,
					x: reducedRect.x+1,
					width: reducedRect.width-2
				}
				let lowerRect = {
					y: this.y + 1,
					x: this.x+1,
					width: this.width-2
				}
				if(!blockCollision(this.getRect(higherRect))) // if there's not a block above the player
					if(this.hasJump && upKey && blockCollision(this.getRect(lowerRect))) {
						this.vspeed = -this.height/5;
						this.hasJump = false;
					}
			
			this.y += this.vspeed;
			
			/*
			// this is a mañosada that makes you not stop when hitting a top
			if(this.vspeed <= 0) {
				let side = (this.width - reducedRect.width) / 2;
//				if(!blockCollision(this.getRect({y: this.y-this.height/3*2, height: this.height/3})))
				if(blockCollision(this.getRect({x:this.x+side,width:this.width-side*2, y: this.y-this.height/3, height: this.height/3}))) {
					//this.y = this.y - this.y % this.height// + this.height;
					this.vspeed = 0;
					//console.log("XD")
				}
			}
			/**/
			
			// sideways movement
			if(rightKey)
				this.direction = 1;
			else if(leftKey)
				this.direction = -1;
			let wallBlock = {
				x: reducedRect.x, //this.x + this.hspeed * this.direction,
				y: this.y + 1 + this.height/3, //this.y + 1, // + this.height/2,
				width: reducedRect.width,
				height: - 2 + this.height3*2//2 - 1
			}
			if(rightKey || leftKey) {
				//let modifiedRect = {x: reducedRect.x, y: this.y, width: reducedRect.width, height: this.height}
				if(!blockCollision(wallBlock)) {// if there's no wall
					if(wallBlock.x > 0 && wallBlock.x < width - wallBlock.width) {// if player is inside the screen
						this.x += this.hspeed * this.direction;
						//console.log("si");
					}
				}
				else
					;//console.log("sisisi")
			}
			
			// enemy's interaction
			if(enemyCollision(this)) {
				enemies.forEach( (e) => {
					if(collides(e, this)) {
						if(e.living) {
							let wellHeight = this.y + this.height/2 < e.y;
							if(this.vspeed >= 0 && wellHeight) {
								this.vspeed = -this.height/10;
								e.living = false;
							}
							else {
								this.die();
							}
						}
					}
				});
			}

			// spikes collision
			let xx = this.x, yy = this.y, hh = this.height, ww = this.width;
			if(spikesCollision({x: xx + ww/10, y: yy + hh/10, height: hh/10*8, width: ww/10*8})) {
				this.die();
			}
			
			if(this.y > height) {
				this.die();
			}
			
			this.moveEyes();
		}
	}
	
	die() {
		this.x = this.xInit;
		this.y = this.yInit;
		this.direction = 1;
		this.vspeed = 0;
	}
	
	moveEyes() {
		if(playing) {
			if(this.direction > 0)
				this.eyesX = this.width/2;
			else
				this.eyesX = 0;
			
			let r = this.getRect({x: this.x});
			let newEyesPosition = Math.max(0, Math.min(r.height/2, r.height/4 + this.vspeed/this.maxVspeed*r.height));//r.height/5 + this.vspeed/this.maxSpeed*(r.height/2)));
			this.eyesY = newEyesPosition;

			this.updateCanvas();
		}
		else {
			this.eyesX = this.width/2;
			this.eyesY = this.height/4;
		}
	}

	getRect(rect) {
		return {
			x: rect.x || this.x,
			y: rect.y + 1 || this.y + 1, // para evitar chocar con techo
			width: rect.width || this.width,
			height: rect.height || this.height - 2, // para evitar chocar con suelo
		}
	}
	
	getReducedRect() {
		let redX = this.width / 5;
		let redY = this.height / 3;
		return {
			x: this.x + redX,
			y: this.y + redY,
			width: this.width - 2*redX,
			height: this.height - redY,
		}
	}
}

class SpikesBlock {
	constructor(json) {
		this.name = 'spikes';
		this.width = json.width || gridWidth;
		this.height = json.width || gridHeight;
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.color = json.color || "#BBB";
		this.spikesColor = json.spikesColor || "#999";
				
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvasCtx = this.canvas.getContext('2d');
		this.updateCanvas();
		
		if(!json.specialObject)
			spikesBlocks.push(this);
	}
	updateCanvas() {
		this.canvasCtx.fillStyle = this.color;
		drawRect(this.getReducedRect(), this.canvasCtx);
		var triangle = [];
		let w = this.width, h = this.height;
		triangle[0] = {x1: w/10,   y1: h/10, x2: w/4,   y2: h/5*2, x3: w/5*2, y3: h/4};
		triangle[1] = {x1: w/2,    y1: 0,    x2: w/5*3, y2: h/4,   x3: w/5*2, y3: h/4};
		triangle[2] = {x1: w-w/10, y1: h/10, x2: w/4*3, y2: h/5*2, x3: w/5*3, y3: h/4};
		triangle[3] = {x1: 0, y1: h/2, x2: w/4,   y2: h/5*2, x3: w/4,   y3: h/5*3};
		triangle[4] = {x1: w, y1: h/2, x2: w/4*3, y2: h/5*2, x3: w/4*3, y3: h/5*3};
		triangle[5] = {x1: w/10,   y1: h-h/10, x2: w/4,   y2: h/5*3, x3: w/5*2, y3: h/4*3};
		triangle[6] = {x1: w/2,    y1: h,      x2: w/5*3, y2: h/4*3, x3: w/5*2, y3: h/4*3};
		triangle[7] = {x1: w-w/10, y1: h-h/10, x2: w/4*3, y2: h/5*3, x3: w/5*3, y3: h/4*3};
		this.canvasCtx.fillStyle = this.spikesColor;
		for(let i = 0 ; i < triangle.length ; i++)
			drawTriangle(triangle[i], this.canvasCtx);
		//console.log(triangle[0]);
	}
	draw(ctx) {
		ctx.drawImage(this.canvas, this.x, this.y, this.width, this.height);
	}
	getReducedRect() {
		let redX = this.width/2;
		let redY = this.height/2;
		return {
			x: redX/2,
			y: redY/2,
			width: this.width - redX,
			height: this.height - redY,
		};
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
		this.fontSize = this.bottomHeight/3;
		
		// buttons and things idk
			// top things
			let arrowSize = this.topHeight / 2;
			let displayedBoardSampleObjectBoxSize = 3 * this.topHeight / 4;
			this.closeBoard = {
				x: sampleObjectCanvas.width/5,
				y: sampleObjectCanvas.width/5,
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
			let image = {
				x: (width - displayedBoardSampleObjectImageSize)/2,
				y: (this.topHeight - displayedBoardSampleObjectImageSize) / 2,
				width: displayedBoardSampleObjectImageSize,
				height: displayedBoardSampleObjectImageSize,
				specialObject: true
			};
			this.displayedBoardSampleObject = [];
			for(let i=0; i <= constSpikesBlock; i++) {
				switch(i) {
						case constEraser:
							this.displayedBoardSampleObject.push(new Eraser(image));
							break;
						case constBlock:
							this.displayedBoardSampleObject.push(new Block(image));
							break;
						case constEnemy:
							this.displayedBoardSampleObject.push(new Enemy(image));
							break;
						case constPlayer:
							this.displayedBoardSampleObject.push(new Player(image));
							break;
						case constSpikesBlock:
							this.displayedBoardSampleObject.push(new SpikesBlock(image));
							break;
					}
				}
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
			
			this.eraseAll = {
				x: width - sampleObjectCanvas.width/5 - this.topHeight/4,
				y: sampleObjectCanvas.width/5,
				width: this.topHeight/4,
				height: this.topHeight/4,
				borderRadius: this.topHeight/16,
				canvas: 0,
			};
				let eraseCanvas = document.createElement('canvas');
				eraseCanvas.height = this.eraseAll.height;
				eraseCanvas.width = this.eraseAll.width;
				let eraseCtx = eraseCanvas.getContext('2d');
				eraseCtx.fillStyle = '#FFF';
				drawRoundedRect({x: 0, y: 0, width: this.eraseAll.width, height: this.eraseAll.height}, eraseCtx);
				eraseCtx.fillStyle = "#000"
				let trash1 = {
					x: this.eraseAll.width/8*3,
					y: this.eraseAll.height/5,
					width: this.eraseAll.width/4,
					height: this.eraseAll.height/20
				}
				let trash2 = {
					x: this.eraseAll.width/4,
					y: this.eraseAll.height/20*5,
					width: this.eraseAll.width/2,
					height: this.eraseAll.height/10
				}
				let trashTrapeze = {
					x1: trash2.x,
					y1: trash2.y + this.eraseAll.height/20*3,
					x2: trash2.x + trash2.width,
					y2: trash2.y + this.eraseAll.height/20*3,
					x3: trash2.x + trash2.width/4*3,
					y3: trash2.y + this.eraseAll.height/5*3,
					x4: trash2.x + trash2.width/4,
					y4: trash2.y + this.eraseAll.height/5*3
				}
				drawRect(trash1, eraseCtx);
				drawRect(trash2, eraseCtx);
				drawTrapeze(trashTrapeze, eraseCtx);
			this.eraseAll.canvas = eraseCanvas;
			
				// start the canvas
				let playCanvas = document.createElement('canvas');
				let stopCanvas = document.createElement('canvas');
				playCanvas.width = stopCanvas.width = sampleObjectCanvas.width;
				playCanvas.height = stopCanvas.height = sampleObjectCanvas.height;
				let playCtx = playCanvas.getContext('2d');
				let stopCtx = stopCanvas.getContext('2d');
				// paint on the canvas
				playCtx.fillStyle = stopCtx.fillStyle = "#FFF";
				drawRoundedRect(this.undisplayedBoardSampleObjectBox, playCtx);
				drawRoundedRect(this.undisplayedBoardSampleObjectBox, stopCtx);
				playCtx.fillStyle = "#0A0";
				stopCtx.fillStyle = "#A00";
				let valor = this.undisplayedBoardSampleObjectBox.width/5;
				let rect = {
					x: valor,
					y: valor,
					width: valor*3,
					height: valor*3
				}
				drawRect(rect, stopCtx)
				drawTriangle(rect, playCtx)
				
			this.buttonPlay = { // this one IS drawn in the main canvas
				x: width - playCanvas.width/5 * 6,
				y: playCanvas.width/5,
				width: playCanvas.width,
				height: playCanvas.height,
				playCanvas: playCanvas, //"#0A0",
				stopCanvas: stopCanvas //"#A00"
			};
			
			// a canvas for the save button
				let saveCanvas = document.createElement('canvas');
				saveCanvas.height = this.eraseAll.height;
				saveCanvas.width = this.eraseAll.width;
				let ww = saveCanvas.width, hh = saveCanvas.height,
					xx = ww/6, yy = hh/6;
				
				let black = {
					x1: xx,
					y1: yy,
					x2: ww - ww/6 - xx,
					y2: yy,
					x3: ww - xx,
					y3: hh/6 + yy,
					x4: ww - xx,
					y4: hh - yy,
					x5: xx,
					y5: hh - yy,
					borderRadius: ww/8
				};
				let whiteRect = {
					x: xx + xx/2,
					y: yy + yy/2,
					width: ww/3,
					height: hh/7,
					borderRadius: ww/16
				};
				let whiteCircle = {
					x: ww/10*4,
					y: hh/10*6 - yy/4,
					width: ww/5,
					height: hh/5
				};
				let saveCtx = saveCanvas.getContext('2d');
				let saveBackground = {
					borderRadius: this.eraseAll.borderRadius,
					x: 0, y: 0,
					width: this.eraseAll.width,
					height: this.eraseAll.height
				};
				drawSaveButton(saveBackground, black, whiteRect, whiteCircle, saveCtx);/**/
				
			this.buttonSave = {
				x: this.eraseAll.x,
				y: this.eraseAll.y + saveCanvas.height/5 * 6,
				width: saveCanvas.width,
				height: saveCanvas.height,
				canvas: saveCanvas
			};
			
				let loadCanvas = document.createElement('canvas');
				loadCanvas.height = this.eraseAll.height;
				loadCanvas.width = this.eraseAll.width;
				let folder = {
					x1: xx,
					x2: xx/3*4,
					x3: ww/2 - xx/2,
					x4: ww/2,
					x5: ww - xx/3*4,
					x6: ww - xx,
					y1: yy,
					y2: yy/3*4,
					y3: yy*2,
					y4: yy/2*5,
					y5: hh - yy
				};
			let loadCtx = loadCanvas.getContext('2d');
			drawLoadButton(saveBackground, folder, loadCtx);
			
			this.buttonLoad = {
				x: this.eraseAll.x,
				y: this.eraseAll.y + loadCanvas.height/5 * 12,
				width: loadCanvas.width,
				height: loadCanvas.height,
				canvas: loadCanvas
			};
			
			console.log()
	}
	
	draw(ctx) {
		if(this.displayed) {
			this.drawBoard(ctx);
		}
		else { // No está desplegado el menú
			if(!playing) {
				sampleObjetcCtx.fillStyle = this.undisplayedBoardSampleObjectBox.color;
				drawRoundedRect(this.undisplayedBoardSampleObjectBox, sampleObjetcCtx);
				sampleObject[selectedObject].draw(sampleObjetcCtx);
				let position = sampleObjectCanvas.width/5;
				ctx.globalAlpha = ".5";
				ctx.drawImage(sampleObjectCanvas, position, position);
				ctx.globalAlpha = "1";
			}
			
			// playing
			let thePlayImage = this.buttonPlay.playCanvas;
			if(playing)
				thePlayImage = this.buttonPlay.stopCanvas;
			ctx.globalAlpha = ".5";
			ctx.drawImage(thePlayImage, this.buttonPlay.x, this.buttonPlay.y)
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
			// close button
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
			
			// white sample object box
			ctx.fillStyle = "#FFF";
			drawRoundedRect(this.displayedBoardSampleObjectBox, ctx);			
			// sample object image
			ctx.drawImage(this.displayedBoardSampleObject[selectedObject].canvas,
				this.displayedBoardSampleObject[selectedObject].x,
				this.displayedBoardSampleObject[selectedObject].y
			);
			// sample object and sample object name
			ctx.fillStyle = "#FFF";
			drawRoundedRect({
				x: this.displayedBoardSampleObjectBox.x,
				y: this.displayedBoardSampleObjectBox.y + this.topHeight - this.fontSize/3,
				width: this.displayedBoardSampleObjectBox.width,
				height: this.fontSize * 1.5,
				borderRadius: this.fontSize/2,
			}, ctx);
			ctx.fillStyle = this.displayedBoardSampleObject[selectedObject].color;
			drawString(this.displayedBoardSampleObject[selectedObject].x,
				this.displayedBoardSampleObject[selectedObject].y + this.topHeight,
				this.displayedBoardSampleObject[selectedObject].name, ctx);
			
			// arrows
			ctx.fillStyle = "#845FCC";
			drawTriangle(this.rightArrow, ctx);
			drawTriangle(this.leftArrow, ctx);
			
			// erase, save and load buttons
			ctx.drawImage(this.eraseAll.canvas, this.eraseAll.x, this.eraseAll.y);
			ctx.drawImage(this.buttonSave.canvas, this.buttonSave.x, this.buttonSave.y);
			ctx.drawImage(this.buttonLoad.canvas, this.buttonLoad.x, this.buttonLoad.y);
		
		// bottom things
			// grid button
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
			
			// grid buttons
			ctx.fillStyle = this.gridYButtom.color;
			drawRoundedRect(this.gridYButtom, ctx);
			drawRoundedRect(this.gridXButtom, ctx);
			ctx.fillStyle = "#640999";
			ctx.font = this.fontSize + "px sans-serif";
			drawString(this.gridXButtom.x + this.bottomHeight/10, this.gridXButtom.y + this.gridXButtom.height/3*2, 'X: '+gridX, ctx);
			drawString(this.gridYButtom.x + this.bottomHeight/10, this.gridYButtom.y + this.gridYButtom.height/3*2, 'Y: '+gridY, ctx);
	}
}

function destroyObject(x, y) {
	blocks.forEach( (block, i) => {
		if(block.x === x && block.y === y)
			blocks.splice(i, 1);
	});
	enemies.forEach( (enemy, i) => {
		if(enemy.x === x && enemy.y === y)
			enemies.splice(i, 1);
	});
	player.forEach( (p, i) => {
		if(p.x === x && p.y === y)
			player.splice(i, 1);
	});
	spikesBlocks.forEach( (spike, i) => {
		if(spike.x === x && spike.y === y)
			spikesBlocks.splice(i, 1);
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


function drawTrapeze(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
	let x1, x2, x3, x4, y1, y2, y3, y4, ctx;
	if(typeof arg1.x1 != "undefined") {
		x1 = arg1.x1;
		x2 = arg1.x2;
		x3 = arg1.x3;
		x4 = arg1.x4;
		y1 = arg1.y1;
		y2 = arg1.y2;
		y3 = arg1.y3;
		y4 = arg1.y4;
		ctx = arg2;
	}
	else {
		x1 = arg1;
		x2 = arg2;
		x3 = arg3;
		x4 = arg4;
		y1 = arg5;
		y2 = arg6;
		y3 = arg7;
		y4 = arg8;
		ctx = arg9;
	}
	
	ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
}

function drawTriangle(obj, ctx) {
	/*
		this boy accepts two forms: a rectangle and a primitive triangle
		Examples:
			drawTriangle({blocks[2]}, canvasCtx) // it will draw a triangle inside that block object
			drawTriangle({x: 0, y: 200, width: 100, height, 100}, canvasCtx) // it will draw a triangle in the (x, y) coordinates with the given width and height
			drawTriangle({x1: 60, y1: 20, x2: 40, y2: 80, x3: 50, y3: 50}, canvasCtx) // it will draw a triangle with the exact given points
	*/
	let x1, x2, x3, y1, y2, y3;
	if(typeof obj.x == 'undefined') {
		x1 = obj.x1;
		x2 = obj.x2;
		x3 = obj.x3;
		y1 = obj.y1;
		y2 = obj.y2;
		y3 = obj.y3;
	}
	else {
		x1 = obj.x;
		x2 = obj.x + obj.width;
		x3 = obj.x;
		y1 = obj.y;
		y2 = obj.y + obj.height/2;
		y3 = obj.y + obj.height;
	}
	
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
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

function drawSaveButton(background, black, rect, circle, ctx) {
	// background
		ctx.fillStyle = "#FFF"
		drawRoundedRect(background, ctx);
	
	// black thing
		ctx.fillStyle = "#000";
		let borderRadius = black.borderRadius || width/gridX/8;
		ctx.beginPath();
		ctx.moveTo(black.x1 + borderRadius, black.y1);
		ctx.lineTo(black.x2 - borderRadius/4, black.y2);
		ctx.quadraticCurveTo(black.x2, black.y2, black.x2 + borderRadius/4, black.y2 + borderRadius/4);
		ctx.lineTo(black.x3 - borderRadius/4, black.y3 - borderRadius/4);
		ctx.quadraticCurveTo(black.x3, black.y3, black.x3, black.y3 + borderRadius/3);
		ctx.lineTo(black.x4, black.y4 - borderRadius);
		ctx.quadraticCurveTo(black.x4, black.y4, black.x4 - borderRadius, black.y4);
		ctx.lineTo(black.x5 + borderRadius, black.y5);
		ctx.quadraticCurveTo(black.x5, black.y5, black.x5, black.y5 - borderRadius);
		ctx.lineTo(black.x1, black.y1 + borderRadius);
		ctx.quadraticCurveTo(black.x1, black.y1, black.x1 + borderRadius, black.y1);
		ctx.fill();
	
	// white things
		ctx.fillStyle = "#FFF";
		borderRadius = black.borderRadius/2 || width/gridX/16;
		drawRoundedRect(rect, ctx);
		drawCircle(circle, ctx);
}

function drawLoadButton(background, folder, ctx) {
	// background
		ctx.fillStyle = "#FFF";
		drawRoundedRect(background, ctx);
		
	// top black thing
		ctx.fillStyle = "#000";
		ctx.beginPath();
		ctx.moveTo(folder.x2, folder.y1);
		ctx.lineTo(folder.x3, folder.y1);
		ctx.lineTo(folder.x4, folder.y2);
		ctx.lineTo(folder.x5, folder.y2);
		ctx.lineTo(folder.x5, folder.y3);
		ctx.lineTo(folder.x2, folder.y3);
		ctx.fill();
		
	// bottom black thing
		ctx.beginPath();
		ctx.moveTo(folder.x1, folder.y4);
		ctx.lineTo(folder.x6, folder.y4);
		ctx.lineTo(folder.x5, folder.y5);
		ctx.lineTo(folder.x2, folder.y5);
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
	enemies.forEach( enemy => {
		enemy.draw(canvasCtx);
	});
	spikesBlocks.forEach( spike => {
		spike.draw(canvasCtx);
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
// resize window
window.onresize = updateEverything;

// load and save level things
function downloadLevel(fileName = "level.txt") {
	var output = objectsStateToJSON();
	
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(output)], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function objectsStateToJSON() {
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

function loadObjects(json) {
	enemyCounter = 0;
	json.forEach( (obj, i) => {
		if(i == 0) {
			setGridX(obj.x, true);
			setGridY(obj.y, true);
		}
		else {
			switch(obj.type) {
				case constBlock:
					new Block({
						x: obj.x*gridWidth,
						y: obj.y*gridHeight
					});
					break;
				case constEnemy:
					new Enemy({
						id: ++enemyCounter,
						x: obj.x*gridWidth,
						y: obj.y*gridHeight
					});
					break;
				case constPlayer:
					new Player({
						x: obj.x*gridWidth,
						y: obj.y*gridHeight
					});
					break;
				case constSpikesBlock:
					new SpikesBlock({
						x: obj.x*gridWidth,
						y: obj.y*gridHeight
					});
					break;
			}
		}
	});
	blocks.forEach( b => {
		console.log(b);
		b.updateCanvas(true);
	});
}

fileInput.addEventListener('change', e => {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    contenido = e.target.result;
    console.log(contenido);
	  let json = JSON.parse(contenido);
	  loadObjects(json);
  };
  lector.readAsText(archivo);
});

// touch events
canvas.addEventListener('touchstart', touch => {
	var x = touch.changedTouches[0].clientX,
		y = touch.changedTouches[0].clientY;
	mouseX = x;
	mouseY = y;
	click = true;
	singleClick(x, y);
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
	deletedObjectPoint.x = deletedObjectPoint.y = - width;
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
		if(!playing)
			if(pointCollision(md.x, md.y, sampleObjectButtom)) {
				board.displayed = !board.displayed;
				return;
			}
		if(pointCollision(md.x, md.y, board.buttonPlay)) {
			playFunction();
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
		if(pointCollision(md.x, md.y, board.displayedBoardSampleObjectBox)) {
			board.displayed = !board.displayed;
			return;
		}
		if(pointCollision(md.x, md.y, board.rightArrow)) {
			rightArrowFunction();
			return;
		}
		if(pointCollision(md.x, md.y, board.buttonSave)) {
			downloadLevel();
			return;
		}
		if(pointCollision(md.x, md.y, board.buttonLoad)) {
			fileInput.click();
			return;
		}
		if(pointCollision(md.x, md.y, board.eraseAll)) {
			deleteEverything(true);
			return;
		}
		if(pointCollision(md.x, md.y, board.gridYButtom)) {
			setGridY();
			return;
		}
		if(pointCollision(md.x, md.y, board.gridButton)) {
			displayedGrid = !displayedGrid;
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
	singleClick(md.x, md.y);
});

canvas.addEventListener("mouseup", mu => {
	blocks.forEach( (b, i) => {
		b.updateCanvas(true);
	})
	click = rightClick = false;
	deletedObjectPoint.x = deletedObjectPoint.y = - width;
})

canvas.addEventListener("mousemove", mm => {
	mouseX = mm.x;
	mouseY = mm.y;
})

// key events
window.addEventListener("keydown", key => {
	console.log(key.keyCode);
	if(key.keyCode == 18) { // alt
		alt = true;
		return;
	}
	if(key.keyCode == 27) { // Escape
		if(!playing)
			board.displayed = !board.displayed;
		return;
	}
	if(key.keyCode == 83 && alt) { // alt + Q
		alt = false;
		downloadLevel();
		//download("HOLA MANOLA", 'json.txt');
		return;
	}
	if(key.keyCode == 79 && alt) { // alt + O
		alt = false;
		fileInput.click();
		return;
	}
	if(key.keyCode == 37 || key.keyCode == 65) { // Left arrow or A key
		leftKey = true;
		rightKey = false;
		leftArrowFunction();
		return;
	}
	if(key.keyCode == 38 || key.keyCode == 87) { // Up arrow or W key
		upKey = true;
		player.forEach( p => {
			p.holdJump = true;
		})
		return;
	}
	if(key.keyCode == 39 || key.keyCode == 68) { // Right arrow or D key
		leftKey = false;
		rightKey = true;
		rightArrowFunction();
		return;
	}
	if(key.keyCode >= 49 && key.keyCode <= 53) { // 1 2 3 4 5
		selectedObject = key.keyCode - 49;
		return;
	}
	if(key.keyCode == 67) { // C key
		deleteEverything(true);
		return;
	}
	if(key.keyCode == 71) { // G key
		displayedGrid = !displayedGrid;
		return;
	}
	if(key.keyCode == 80) { // P key
		playFunction();
		return;
	}
	if(key.keyCode == 88) { // X key
		setGridX();
		return;
	}
	if(key.keyCode == 89) { // Y key
		setGridY();
		return;
	}
});

window.addEventListener("keyup", key => {
	//console.log(key)
	if(key.keyCode == 18) { // alt
		alt = false;
		return;
	}
	if(key.keyCode == 37 || key.keyCode == 65) { // Left arrow or A key
		leftKey = false;
		return;
	}
	if(key.keyCode == 38 || key.keyCode == 87) { // Up arrow or W key
		upKey = false;
		player.forEach( p => {
			p.holdJump = false;
		})
		return;
	}
	if(key.keyCode == 39 || key.keyCode == 68) { // Right arrow or D key
		rightKey = false;
		return;
	}
});

//==========================================
// GAME THINGS
//==========================================
function blockCollision(object) {
    return anyCollision(object, blocks);
}

function enemyCollision(object) {
    return anyCollision(object, enemies);
}

function spikesCollision(object) {
    return anyCollision(object, spikesBlocks);
}

function anyCollision(object, array) {
    let i = 0;
    let boxes = array.length;
    while(i < boxes) {
        if(collides(object, array[i]))
            return true;
        i++;
    }
    return false;
}


function deleteEverything(flag) {
	if(player.length + blocks.length + enemies.length + spikesBlocks.length == 0)
		return;
	if(typeof flag != 'undefined')
		if(flag == true)
			if(!confirm("Are you sure you want to clean the screan? You'll lose all your progress"))
				return;
	player.splice(0, player.length);
	blocks.splice(0, blocks.length);
	enemies.splice(0, enemies.length);
	spikesBlocks.splice(0, spikesBlocks.length);
	playing = false;
}

function playFunction() {
	playing = !playing;
	if(playing) {
		board.displayed = false;
	}
	enemies.forEach( (enemy) => {
		enemy.x = enemy.xInit;
		enemy.direction = 1;
		enemy.moveEyes();
		enemy.updateCanvas();
		enemy.living = true;
	});
	player.forEach( (p) => {
		p.x = p.xInit
		p.y = p.yInit
		p.direction = 1;
		p.vspeed = 0;
		p.moveEyes();
		p.updateCanvas();
	})
}

function leftArrowFunction() {
	if(!playing)
		if(selectedObject <= 0)
			selectedObject = sampleObject.length - 1; // el máximo, de momento
		else
			selectedObject--;
}

function rightArrowFunction() {
	if(!playing)
		if(selectedObject >= sampleObject.length - 1) // el máximo, de momento
			selectedObject = 0;
		else
			selectedObject++;
}

function singleClick(clickX, clickY) {
	let x = clickX || mouseX,
		y = clickY || mouseY;
	let thereIsADeletedObject = false;

	if(!playing) {
		blocks.forEach( (block, i) => {
			if(pointCollision(x, y, block) && selectedObject === constBlock) {
				blocks.splice(i, 1);
				thereIsADeletedObject = true;
			}
		});
		enemies.forEach( (enemy, i) => {
			if(pointCollision(x, y, enemy) && selectedObject === constEnemy) {
				enemies.splice(i, 1);
				thereIsADeletedObject = true;
			}
		});
		player.forEach( (p, i) => {
			if(pointCollision(x, y, p) && selectedObject === constPlayer) {
				player.splice(i, 1);
				thereIsADeletedObject = true;
			}
		});
		spikesBlocks.forEach( (s, i) => {
			if(pointCollision(x, y, s) && selectedObject === constPlayer) {
				player.splice(i, 1);
				thereIsADeletedObject = true;
			}
		});
	}
	/**/
	if(!thereIsADeletedObject)
		clicking();
	else {
		deletedObjectPoint.x = x;
		deletedObjectPoint.y = y;
	}
}

function clicking() {
	if((mouseY > board.topHeight && mouseY < height - board.bottomHeight) || !board.displayed) {
		if(pointDistance(deletedObjectPoint, {x: mouseX, y: mouseY}) > Math.max(gridHeight, gridWidth)) {
			deletedObjectPoint.x = deletedObjectPoint.y = -width;
			if(click) {
				let x = mouseX - mouseX % gridWidth,
					y = mouseY - mouseY % gridHeight;
				if(!playing)
					destroyObject(x, y);
				if(!rightClick) {
					switch(selectedObject) {
						case constBlock:
							if(!playing)
							new Block({
								x: x,
								y: y
							});
							break;
						case constEnemy:
							if(!playing)
							new Enemy({
								id: ++enemyCounter,
								x: x,
								y: y
							});
							break;
						case constPlayer:
							if(!playing)
							new Player({
								x: x,
								y: y
							});
							break;
						case constSpikesBlock:
							if(!playing)
							new SpikesBlock({
								x: x,
								y: y
							});
							break;
						case constEraser:
							break;
						default:
							console.log('No object selected.');
							break;
					}
				}
			}
		}
	}
}

function pointDistance(arg1, arg2, arg3, arg4) {
	var x1, y1, x2, y2;
	if(typeof arg1 == 'object') {
		x1 = arg1.x;
		y1 = arg1.y;
		x2 = arg2.x;
		y2 = arg2.y;
	}
	else {
		x1 = arg1;
		y1 = arg2;
		x2 = arg3;
		y2 = arg4;
	}
	return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
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

function setGridX(num, flaj = false) {
	if(!flaj)
		if(!confirm('Are you sure you want to change the grid properties? \nYou\'ll lose your progress.'))
			return;
	let n;
	if(!flaj)
		 n = (typeof num == 'undefined') ? prompt('Type how much horizontal cells you want ') : num;
	else
		n = num;
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

function setGridY(num, flaj = false) {
	if(!flaj)
		if(!confirm('Are you sure you want to change the grid properties? \nYou\'ll lose your progress.'))
			return;
	let n;
	if(!flaj)
		n = (typeof num == 'undefined') ? prompt('Type how much vertical cells you want ') : num;
	else
		n = num;
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
	enemies.forEach( enemy => {
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