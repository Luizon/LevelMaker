import { drawRect } from "../graphics.js";
import { blockCollision, enemyCollision, spikesCollision, collides } from "../engineFunctions.js";
import { GameObject } from "./inherithence/GameObject.js";

export class Player extends GameObject {
	constructor(json) {
		super(json);
		this.name = 'player';
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
		this.dead = false;
		
		destroyObject(this.x, this.y);
		
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
	
	move() {
		if(playing) {
			if(this.dead) {
				this.die();
			}
			else {
				// gravity system
					let modifiedRect = {
						y: this.y + this.vspeed + 1
					}
					let reducedRect = {
						x: this.x + this.hspeed * this.direction + this.width/5,
						width: this.width - this.width/5*2,
						y: this.y + 1 + this.height/6, //y: this.y + this.height/4,
						height: - 2 + this.height6*5 //height: this.height/4*3 + 1
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
							if(!e.dead) {
								let wellHeight = this.y + this.height/2 < e.y;
								if(this.vspeed >= 0 && wellHeight) {
									this.vspeed = -this.height/10;
									e.dead = true;
								}
								else {
									this.dead = true;
								}
							}
						}
					});
				}

				// spikes collision
				let xx = this.x, yy = this.y, hh = this.height, ww = this.width;
				if(spikesCollision({x: xx + ww/10, y: yy + hh/10, height: hh/10*8, width: ww/10*8})) {
					this.dead = true;
				}
				
				if(this.y > height) {
					this.dead = true;
				}
				
				this.moveEyes();
			}
		}
	}
	
	die() {
		if(this.alpha > 0) {
			if(this.alpha == 1) { // draw the dead body just once, before start fading
				this.canvasCtx.fillStyle = this.color;
				drawRect({
					x: 0,
					y: 0,
					width: this.width,
					height: this.height,
				}, this.canvasCtx);
			}
			this.alpha = Math.max(this.alpha - 0.05, 0);
		}
		else {
			this.x = this.xInit;
			this.y = this.yInit;
			this.direction = 1;
			this.vspeed = 0;
			this.dead = false;
			this.alpha = 1;
		}
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

	getRect(rect = {}) {
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