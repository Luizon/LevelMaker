export function clearCanvas(clearedCanvas) {
	let ctx = clearedCanvas.getContext('2d');
	// Store the current transformation matrix
	ctx.save();
	
	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, clearedCanvas.x, clearedCanvas.height);
	
	// Restore the transform
	ctx.restore();
}

export function drawBackground(ctx) {
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, width, height);
}

export function drawRect(rect, ctx) {
	ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

export function drawString(arg1, arg2, arg3, ctx) {
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

export function drawLine(arg1, arg2, arg3, arg4, ctx) {
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

export function drawCircle(obj, ctx) {
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

export function drawGrid(ctx) {
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 1;
	for(let x = 1; x < gridX; x++) {
		drawLine(x*gridWidth, 0, x*gridWidth, height, ctx);
	}
	for(let y = 1; y < gridY; y++) {
		drawLine(0, y*gridHeight, width, y*gridHeight, ctx);
	}
}

export function drawTrapeze(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
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

export function drawTriangle(obj, ctx) {
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

export function drawRoundedRect(obj, ctx) {
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

export function drawSaveButton(background, black, rect, circle, ctx) {
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

export function drawLoadButton(background, folder, ctx) {
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