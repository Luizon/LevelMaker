import { drawRect } from "../graphics.js";
import { blockCollision, spikesCollision, collides } from "../engineFunctions.js";
import { GameObject } from "./inherithence/GameObject.js";

export class Enemy extends GameObject {
	constructor(json) {
		super(json);
		this.id = json.id || 1;
		this.name = 'enemy';
		this.xInit = json.x || 0;
		this.eyesX = this.width/2;
		this.eyesY = this.height/4;
		this.floatY = this.y;
		this.floatX = this.x;
		this.color = json.color || "#A00";
		this.eyesColor = json.eyesColor || "#FFF";
		this.hspeed = this.width / 15;
		this.direction = 1; // 1 is right -1 is left
		this.dead = false;
		
		destroyObject(this.x, this.y);

		this.updateCanvas();

		if(!json.specialObject)
			enemies.push(this);
	}
	
	updateCanvas() {
		this.canvasCtx.fillStyle = this.color;
		drawRect({
			x: 0,
			y: 0,
			width: this.width,
			height: this.height,
		}, this.canvasCtx);
		this.canvasCtx.fillStyle = this.eyesColor;
		drawRect({
			x:this.eyesX,
			y:this.eyesY,
			width:this.width/6,
			height:this.height/2,
		}, this.canvasCtx);
		drawRect({
			x:this.eyesX+this.width/3,
			y:this.eyesY,
			width:this.width/6,
			height:this.height/2,
		}, this.canvasCtx);
	}
	
	move() {
		if(playing && !this.dead) {
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
		if(this.dead) {
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
		}
		else
			this.alpha = 1;
	}
	
	moveEyes() {
		if(playing && !this.dead) {
			if(this.direction > 0)
				this.eyesX = this.width/2;
			else
				this.eyesX = 0;
			this.updateCanvas();
		}
		else
			this.eyesX = this.width/2;
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