import { drawRect } from "../graphics.js";
import { blockCollision } from "../engineFunctions.js";
import { GameObject } from "./inherithence/GameObject.js";

export class Block extends GameObject {
	constructor(json) {
		super(json);
		this.name = 'block';
		this.floatY = this.y;
		this.floatX = this.x;
		this.color = json.color || "#550";
		this.grassColor = json.grassColor || "#0A0";
		
		destroyObject(this.x, this.y);

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
	
	getReducedRect(json) {
		return {
			x: json.x,
			y: json.y,
			width: this.width/2,
			height: this.height/2
		}
	}
}