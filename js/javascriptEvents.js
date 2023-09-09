import { levelIsEmpty, deleteEverything, playFunction, leftArrowFunction, rightArrowFunction, singleClick, undo, pointCollision, setGridX, setGridY } from "./engineFunctions.js";
import { downloadLevel, loadObjects } from "./gameEvents.js";

export function addJSEventListeners() {
fileInput.addEventListener('change', e => { // load file
	let flag = false;
	if(!levelIsEmpty())
		flag = true;
	if(flag == true)
		if(!confirm("Are you sure you want to load a new level?\nYou'll lose all your progress"))
			return;  
	var archivo = e.target.files[0];
	if (!archivo) {
		return;
	}
	var lector = new FileReader();
	lector.onload = function(e) {
	let contenido = e.target.result;
	//console.log(contenido);
	let json = 0;
	try {
		json = JSON.parse(contenido);
	} catch(error) {
		console.error(error);
		alert("There was an error loading your level."
		+"\nThe loaded file is not a Level Maker file or it is corrupted."
		+"\n\nTry again with another file or make a new level.");
	}
	if(json != 0)
		loadObjects(json);
	};
	lector.readAsText(archivo);
	fileInput.value = "";
	lastActions.length = 0;
});

// touch events
canvas.addEventListener('touchstart', touch => {
	var x = touch.changedTouches[0].clientX,
		y = touch.changedTouches[0].clientY;
	mouseX = x;
	mouseY = y;
	if(mouseDown({x: x, y: y}))
		return;
	console.log({x: x, y: y});
	click = true;
	singleClick(x, y);
});

canvas.addEventListener('touchmove', touch => {
	var x = touch.changedTouches[0].clientX,
		y = touch.changedTouches[0].clientY;
	mouseX = x;
	mouseY = y;
	if(mouseMove({x: x, y: y}))
		return;
	click = true;
});

canvas.addEventListener('touchend', touch => {
	mouseUp();
});

// disabling the right click menu
canvas.addEventListener("contextmenu", ctxM => {
	ctxM.preventDefault();
});

// mouse events
canvas.addEventListener("mousedown", md => {
	if(mouseDown({x: md.x, y: md.y}))
		return;
	if(md.which == 1 || md.which == 3) {
		click = true;
		if(md.which == 3)
			rightClick = true;
	}
	singleClick(md.x, md.y);
});

let mouseDown = (md) => {
	let inMouseAlpha = .75;
	let returnNow = false;
	if(!board.displayed) {
		let sampleObjectButton = {
			x: sampleObjectCanvas.width/5,
			y: sampleObjectCanvas.height/5,
			width: board.undisplayedBoardSampleObjectBox.width,
			height: board.undisplayedBoardSampleObjectBox.height,
		}
		if(!playing)
			if(pointCollision(md.x, md.y, sampleObjectButton)) {
				board.displayed = !board.displayed;
				returnNow = true;
			}
		if(pointCollision(md.x, md.y, board.buttonPlay)) {
			playFunction();
			returnNow = true;
		}
	}
	else {
		if(pointCollision(md.x, md.y, board.closeBoard)) {
			board.displayed = !board.displayed;
			board.closeBoard.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.closeBoard.alpha = 1;
		if(pointCollision(md.x, md.y, board.buttonUndo)) {
			undo();
			board.buttonUndo.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.buttonUndo.alpha = 1;
		if(pointCollision(md.x, md.y, board.leftArrow)) {
			leftArrowFunction();
			board.leftArrow.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.leftArrow.alpha = 1;
		if(pointCollision(md.x, md.y, board.displayedBoardSampleObjectBox)) {
			board.displayed = !board.displayed;
			board.displayedBoardSampleObjectBox.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.displayedBoardSampleObjectBox.alpha = 1;
		if(pointCollision(md.x, md.y, board.rightArrow)) {
			rightArrowFunction();
			board.rightArrow.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.rightArrow.alpha = 1;
		if(pointCollision(md.x, md.y, board.buttonSave)) {
			downloadLevel();
			board.buttonSave.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.buttonSave.alpha = 1;
		if(pointCollision(md.x, md.y, board.buttonLoad)) {
			fileInput.click();
			board.buttonLoad.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.buttonLoad.alpha = 1;
		if(pointCollision(md.x, md.y, board.eraseAll)) {
			deleteEverything(true);
			board.eraseAll.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.eraseAll.alpha = 1;
		if(pointCollision(md.x, md.y, board.gridYButton)) {
			setGridY();
			board.gridYButton.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.gridYButton.alpha = 1;
		if(pointCollision(md.x, md.y, board.gridButton)) {
			displayedGrid = !displayedGrid;
			board.gridButton.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.gridButton.alpha = 1;
		if(pointCollision(md.x, md.y, board.gridXButton)) {
			setGridX();
			board.gridXButton.alpha = inMouseAlpha;
			returnNow = true;
		}
		else
			board.gridXButton.alpha = 1;
	}
	return returnNow;
}

canvas.addEventListener("mouseup", mu => {
	mouseUp();
})

let mouseUp = () => {
	blocks.forEach( (b, i) => {
		b.updateCanvas(true);
	})
	click = rightClick = false;
	deletedObjectPoint.x = deletedObjectPoint.y = - width;
}

canvas.addEventListener("mousemove", mm => {
	mouseMove({x: mm.x, y: mm.y});
})

let mouseMove = (mm) => {
	mouseX = mm.x;
	mouseY = mm.y;
	let inMouseAlpha = .87;
	let sampleObjectButton = {
			x: sampleObjectCanvas.width/5,
			y: sampleObjectCanvas.height/5,
			width: board.undisplayedBoardSampleObjectBox.width,
			height: board.undisplayedBoardSampleObjectBox.height,
		}
	if(!board.displayed){
		if(pointCollision(mm.x, mm.y, board.buttonPlay)) {
			board.buttonPlay.alpha = 1;
			return;
		}
		else
			board.buttonPlay.alpha = .5;
		if(!playing)
			if(pointCollision(mm.x, mm.y, sampleObjectButton)) {
				board.undisplayedBoardSampleObjectBox.alpha = 1;
				return;
			}
			else
				board.undisplayedBoardSampleObjectBox.alpha = .5;
	}
	else {
		if(pointCollision(mm.x, mm.y, board.closeBoard)) {
			board.closeBoard.alpha = inMouseAlpha;
			return;
		}
		else
			board.closeBoard.alpha = 1;
		if(pointCollision(mm.x, mm.y, board.buttonUndo)) {
			board.buttonUndo.alpha = inMouseAlpha;
			return;
		}
		else
			board.buttonUndo.alpha = 1;
		if(pointCollision(mm.x, mm.y, board.leftArrow)) {
			board.leftArrow.alpha = inMouseAlpha;
			return;
		}
		else
			board.leftArrow.alpha = 1;
		if(pointCollision(mm.x, mm.y, board.displayedBoardSampleObjectBox)) {
			board.displayedBoardSampleObjectBox.alpha = inMouseAlpha;
			return;
		}
		else
			board.displayedBoardSampleObjectBox.alpha = 1;
		if(pointCollision(mm.x, mm.y, board.rightArrow)) {
			board.rightArrow.alpha = inMouseAlpha;
			return;
		}
		else
			board.rightArrow.alpha = 1;
		if(pointCollision(mm.x, mm.y, board.buttonSave)) {
			board.buttonSave.alpha = inMouseAlpha;
			return;
		}
		else
			board.buttonSave.alpha = 1;
		if(pointCollision(mm.x, mm.y, board.buttonLoad)) {
			board.buttonLoad.alpha = inMouseAlpha;
			return;
		}
		else
			board.buttonLoad.alpha = 1;
		if(pointCollision(mm.x, mm.y, board.eraseAll)) {
			board.eraseAll.alpha = inMouseAlpha;
			return;
		}
		else
			board.eraseAll.alpha = 1;
		if(pointCollision(mm.x, mm.y, board.gridYButton)) {
			board.gridYButton.alpha = inMouseAlpha;
			return;
		}
		else
			board.gridYButton.alpha = 1;
		if(pointCollision(mm.x, mm.y, board.gridButton)) {
			board.gridButton.alpha = inMouseAlpha;
			return;
		}
		else
			board.gridButton.alpha = 1;
		if(pointCollision(mm.x, mm.y, board.gridXButton)) {
			board.gridXButton.alpha = inMouseAlpha;
			return;
		}
		else
			board.gridXButton.alpha = 1;
	}
}

// key events
window.addEventListener("keydown", key => {
	
	if(key.key.toLowerCase() == "r") {
		if(!playing)
			return;
		playing = false;
		playFunction();
		return;
	}
	if(key.key.toLowerCase() == "control") { 
		control = true;
		return;
	}
	if(key.key.toLowerCase() == "alt") { 
		alt = true;
		return;
	}
	if(key.key.toLowerCase() == "escape") { 
		if(!playing)
			board.displayed = !board.displayed;
		return;
	}
	if(key.key.toLowerCase() == "q" && alt) { 
		alt = false;
		downloadLevel();
		return;
	}
	if(key.key.toLowerCase() == "o" && alt) { 
		alt = false;
		fileInput.click();
		return;
	}
	if(key.key.toLowerCase() == "arrowleft" || key.key.toLowerCase() == "a") { 
		leftKey = true;
		rightKey = false;
		leftArrowFunction();
		return;
	}
	if(key.key.toLowerCase() == "arrowup" || key.key.toLowerCase() == "w") { 
		upKey = true;
		player.forEach( p => {
			p.holdJump = true;
		})
		return;
	}
	if(key.key.toLowerCase() == "arrowright" || key.key.toLowerCase() == "d") { 
		leftKey = false;
		rightKey = true;
		rightArrowFunction();
		return;
	}
	if(key.key.toLowerCase() >= "1" && key.key.toLowerCase() <= "5") { 
		selectedObject = key.key.toLowerCase() - 1;
		return;
	}
	if(key.key.toLowerCase() == "c") { 
		deleteEverything(true);
		return;
	}
	if(key.key.toLowerCase() == "g") { 
		displayedGrid = !displayedGrid;
		return;
	}
	if(key.key.toLowerCase() == "p") { 
		playFunction();
		return;
	}
	if(key.key.toLowerCase() == "x") { 
		setGridX();
		return;
	}
	if(key.key.toLowerCase() == "y") { 
		setGridY();
		return;
	}
	if(key.key.toLowerCase() == "z" && (control || alt)) { 
		undo();
		return;
	}
});

window.addEventListener("keyup", key => {
	
	if(key.key.toLowerCase() == "control") { 
		control = false;
		return;
	}
	if(key.key.toLowerCase() == "alt") { 
		alt = false;
		return;
	}
	if(key.key.toLowerCase() == "arrowleft" || key.key.toLowerCase() == "a") { 
		leftKey = false;
		return;
	}
	if(key.key.toLowerCase() == "arrowup" || key.key.toLowerCase() == "w") { 
		upKey = false;
		player.forEach( p => {
			p.holdJump = false;
		})
		return;
	}
	if(key.key.toLowerCase() == "arrowright" || key.key.toLowerCase() == "d") { 
		rightKey = false;
		return;
	}
});
}