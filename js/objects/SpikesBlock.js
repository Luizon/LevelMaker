import { drawRect, drawTriangle } from "../graphics.js";
import { GameObject } from "./inherithence/GameObject.js";

export class SpikesBlock extends GameObject {
	constructor(json) {
		super(json);
		this.name = 'spikes';
		this.color = json.color || "#999";
		this.spikesColor = json.spikesColor || "#555";
				
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
	}
	getReducedRect(rect = {}) {
		let redX = this.width/2;
		let redY = this.height/2;
		return {
			x: (rect.x || 0) + redX/2,
			y: (rect.y || 0) + redY/2,
			width: this.width - redX,
			height: this.height - redY,
		};
	}
	getHitbox() {
		return this.getReducedRect({
			x: this.x,
			y: this.y
		});
	}
}