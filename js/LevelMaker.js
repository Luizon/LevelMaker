import { initializeEverything } from "./gameEvents.js";
import { clicking } from "./engineFunctions.js";
import { drawBackground, drawGrid } from "./graphics.js";
import { addJSEventListeners } from "./javascriptEvents.js";

//==========================================
// RENDER WHOLE IMAGE
//==========================================

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
// IIFE
//==========================================

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

;(function() {
    initializeEverything();
	addJSEventListeners();
    setInterval(loop, 1000/fps);
})();