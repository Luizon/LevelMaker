import { drawRect, drawRoundedRect } from "../graphics.js";
import { GameObject } from "./inherithence/GameObject.js";

export class Eraser extends GameObject {
	constructor(json) {
		super(json);
		this.name = 'eraser';
		this.color = json.color || "#F87";
		this.bottomColor = json.bottomColor || "#58C";
		
		this.updateCanvas();
	}
	updateCanvas() {
		this.canvasCtx.fillStyle = this.color;
		drawRoundedRect({x:0, y:0, width:this.width, height:this.height, borderRadius:this.width/6}, this.canvasCtx);
		this.canvasCtx.fillStyle = this.bottomColor;
		drawRoundedRect({x:0, y:this.height/3*2, width:this.width, height:this.height/3, borderRadius:this.width/6}, this.canvasCtx);
		drawRect({x:0, y:this.height/3*2, width:this.width, height:this.height/6}, this.canvasCtx);
	}
}