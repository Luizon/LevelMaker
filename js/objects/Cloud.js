import { clearCanvas, drawRect, drawCircle } from "../graphics.js";
import { GameObject } from "./inherithence/GameObject.js";

export class Cloud extends GameObject{
	constructor(json) {
		super(json);
		this.name = 'cloud';
		let tam = width < height ? width : height;
		this.width = json.width || tam/4+Math.random()*tam/4;
		this.height = json.height || this.width/2+Math.random()*this.width/4;
		this.x = json.x || Math.random()*width;
		this.floatX = this.x;
		this.y = json.y || Math.random()*height/3 - this.height;
		this.color = json.color || "#FFF";
		this.speed = json.speed || Math.max(1, Math.random()*3);
		
		this.canvas.width = this.width;
		this.canvas.height = this.height;
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
}