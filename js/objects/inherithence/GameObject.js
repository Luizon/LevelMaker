export class GameObject {
    constructor(json) {
        this.name = 'Object';
		this.width = json.width || gridWidth || 1;
		this.height = json.width || gridHeight || 1;
		this.x = json.x || 0;
		this.y = json.y || 0;
		this.color = json.color || "#888";
		this.alpha = json.alpha || 1;

        this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvasCtx = this.canvas.getContext('2d');
    }

	move() {
		// you have to overload this on the new objects that inherits GameObject
	}
	
	draw(ctx) {
		ctx.globalAlpha = this.alpha;
		ctx.drawImage(this.canvas, this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
	}

	getRect() { // use this one for draw
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
		}
	}

	getHitbox() { // use this one for collides
		return this.getRect();
	}
}