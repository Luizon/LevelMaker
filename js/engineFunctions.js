import { Block } from "./objects/Block.js";
import { Enemy } from "./objects/Enemy.js";
import { Player } from "./objects/Player.js";
import { SpikesBlock } from "./objects/SpikesBlock.js";

export function blockCollision(object) {
    return anyCollision(object, blocks);
}

export function enemyCollision(object) {
    return anyCollision(object, enemies);
}

export function spikesCollision(object) {
    return anyCollision(object, spikesBlocks);
}

export function anyCollision(object, array) {
    let i = 0;
    let boxes = array.length;
    while(i < boxes) {
        if(collides(object, array[i]))
            return true;
        i++;
    }
    return false;
}

export function countObjects() {
	return player.length + blocks.length + enemies.length + spikesBlocks.length;
}

export function levelIsEmpty() {
	return countObjects() == 0;
}

export function deleteEverything(flag) {
	if(levelIsEmpty())
		return;
	if(typeof flag != 'undefined')
		if(flag == true)
			if(!confirm("Are you sure you want to clean the screan?\nYou'll lose all your progress"))
				return;
	player.splice(0, player.length);
	blocks.splice(0, blocks.length);
	enemies.splice(0, enemies.length);
	spikesBlocks.splice(0, spikesBlocks.length);
	lastActions.length = 0;
	playing = false;
}

export function playFunction() {
	playing = !playing;
	if(playing) {
		board.displayed = false;
	}
	enemies.forEach( (enemy) => {
		enemy.x = enemy.xInit;
		enemy.direction = 1;
		enemy.moveEyes();
		enemy.updateCanvas();
		enemy.living = true;
	});
	player.forEach( (p) => {
		p.x = p.xInit
		p.y = p.yInit
		p.direction = 1;
		p.vspeed = 0;
		p.moveEyes();
		p.updateCanvas();
	})
}

export function leftArrowFunction() {
	if(!playing)
		if(selectedObject <= 0)
			selectedObject = sampleObject.length - 1; // el máximo, de momento
		else
			selectedObject--;
}

export function rightArrowFunction() {
	if(!playing)
		if(selectedObject >= sampleObject.length - 1) // el máximo, de momento
			selectedObject = 0;
		else
			selectedObject++;
}

export function singleClick(clickX, clickY) {
	let x = clickX || mouseX,
		y = clickY || mouseY;
	let deletedObjectX = (mouseX - mouseX % gridWidth) / gridWidth,
		deletedObjectY = (mouseY - mouseY % gridHeight) / gridHeight;
	let thereIsADeletedObject = false;
	
	if(!playing) {
		blocks.forEach( (block, i) => {
			if(pointCollision(x, y, block) && selectedObject === constBlock) {
				blocks.splice(i, 1);
				thereIsADeletedObject = true;
				addToHistory(deletedObjectX, deletedObjectY, constBlock);
			}
		});
		enemies.forEach( (enemy, i) => {
			if(pointCollision(x, y, enemy) && selectedObject === constEnemy) {
				enemies.splice(i, 1);
				thereIsADeletedObject = true;
				addToHistory(deletedObjectX, deletedObjectY, constEnemy);
			}
		});
		player.forEach( (p, i) => {
			if(pointCollision(x, y, p) && selectedObject === constPlayer) {
				player.splice(i, 1);
				thereIsADeletedObject = true;
				addToHistory(deletedObjectX, deletedObjectY, constPlayer);
			}
		});
		spikesBlocks.forEach( (s, i) => {
			if(pointCollision(x, y, s) && selectedObject === constSpikesBlock) {
				spikesBlocks.splice(i, 1);
				thereIsADeletedObject = true;
				addToHistory(deletedObjectX, deletedObjectY, constSpikesBlock);
			}
		});
	}
	/**/
	if(thereIsADeletedObject) {
		deletedObjectPoint.x = x;
		deletedObjectPoint.y = y;
	}
	/*else
		clicking();*/
}

export function clicking() {
	if((mouseY > board.topHeight && mouseY < height - board.bottomHeight) || !board.displayed) {
		if(pointDistance(deletedObjectPoint, {x: mouseX, y: mouseY}) > Math.max(gridHeight, gridWidth)) {
			deletedObjectPoint.x = deletedObjectPoint.y = -width;
			if(click) {
				if(!playing) {
					let x = mouseX - mouseX % gridWidth,
						y = mouseY - mouseY % gridHeight;
					let deletedObject = getObject(x, y);
					let addANewObject = true;
					if(deletedObject) {
						if(deletedObject.object == selectedObject)
							addANewObject = false;
					}
					if(addANewObject || rightClick) {
						destroyObject(x, y);
						if(deletedObject) {
							let objX = x / gridWidth,
								objY = y / gridHeight;
							addToHistory(objX, objY, deletedObject.object);
						}
						if(!rightClick) {
							switch(selectedObject) {
								case constBlock:
									new Block({
										x: x,
										y: y
									});
									break;
								case constEnemy:
									new Enemy({
										id: ++enemyCounter,
										x: x,
										y: y
									});
									break;
								case constPlayer:
									new Player({
										x: x,
										y: y
									});
									break;
								case constSpikesBlock:
									new SpikesBlock({
										x: x,
										y: y
									});
									break;
								case constEraser:
									break;
								default:
									console.log('No object selected.');
									break;
							}
							let objX = x / gridWidth,
								objY = y / gridHeight;
							addToHistory(objX, objY);
						}
					}
				}
			}
		}
	}
}

export function addToHistory(x, y, deletedObject = false) {
	if(lastActions.length >= historyLimit)
		lastActions.splice(0, 1);
	if(!deletedObject) { // theres no deleted object, its an added object then
		if(selectedObject > constEraser && selectedObject <= constSpikesBlock) {
			let objectAdded = {x: x, y: y, object: selectedObject};
			let itsANewObject = true;
			if(lastActions.length > 0)
				if(lastActions.slice(-1)[0].action == constAdd
				&& lastActions.slice(-1)[0].object.x == objectAdded.x
				&& lastActions.slice(-1)[0].object.y == objectAdded.y
				&& lastActions.slice(-1)[0].object.object == objectAdded.object)
					itsANewObject = false;
			/**/
			if(itsANewObject)
				lastActions.push({action: constAdd, object: objectAdded});
		}
	}
	else { // there IS a deleted object
		let objectDeleted = {x: x, y: y, object: deletedObject};
		lastActions.push({action: constDelete, object: objectDeleted});
	}
}

export function undo() {
	if(lastActions.length > 0) {
		let obj = lastActions[lastActions.length - 1].object;
		if(lastActions[lastActions.length - 1].action == constDelete) {
			addObject(obj.x*gridWidth, obj.y*gridHeight, obj.object);
		}
		else {
			destroyObject(obj.x*gridWidth, obj.y*gridHeight);
		}
		if(obj.object == constBlock) {
			blocks.forEach( b => {
				b.updateCanvas(true);
			});
		}
		lastActions.splice(lastActions.length - 1, lastActions.length); // xddddd
	}
}

export function pointDistance(arg1, arg2, arg3, arg4) {
	var x1, y1, x2, y2;
	if(typeof arg1 == 'object') {
		x1 = arg1.x;
		y1 = arg1.y;
		x2 = arg2.x;
		y2 = arg2.y;
	}
	else {
		x1 = arg1;
		y1 = arg2;
		x2 = arg3;
		y2 = arg4;
	}
	return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
}

export function collides(obj1, obj2) {
  let x11 = obj1.x,
    y11 = obj1.y,
    x12 = obj1.x + obj1.width,
    y12 = obj1.y + obj1.height,
    x21 = obj2.x,
    y21 = obj2.y,
    x22 = obj2.x + obj2.width,
    y22 = obj2.y + obj2.height;
  if((x11 >= x21 && x11 <= x22)
  || (x12 >= x21 && x12 <= x22)) {
    if(y11==y21 || y11==y22
    || y12==y21 || y12==y22)
      return true;
    if((y12 > y21 && y12 < y22)
    || (y11 > y21 && y11 < y22))
      return true;
    }
  return false;
}

export function pointCollision(x, y, rect) {
	if(rect.width >= 0)
		return (x>=rect.x && x<=rect.x+rect.width
			&& y>=rect.y && y<=rect.y+rect.height);
	else // this one is for the leftArrow
		return (x>=rect.x+rect.width && x<=rect.x
			&& y>=rect.y && y<=rect.y+rect.height)
}

export function setGridX(num, flaj = false) {
	if(!flaj)
		if(!confirm('Are you sure you want to change the grid properties? \nYou\'ll lose your progress.'))
			return;
	let n;
	if(!flaj)
		 n = (typeof num == 'undefined') ? prompt('Type how much horizontal cells you want ') : num;
	else
		n = num;
	if(typeof n == 'string' || typeof n == 'number') {
		if(isNaN(n)) {
			alert('That\'s not a number, it won\'t work');
			return;
		}
		gridX = n;
		gridWidth = Math.ceil(width / gridX);
		deleteEverything();
	}
}

export function setGridY(num, flaj = false) {
	if(!flaj)
		if(!confirm('Are you sure you want to change the grid properties? \nYou\'ll lose your progress.'))
			return;
	let n;
	if(!flaj)
		n = (typeof num == 'undefined') ? prompt('Type how much vertical cells you want ') : num;
	else
		n = num;
	if(typeof n == 'string' || typeof n == 'number') {
		if(isNaN(n)) {
			alert('That\'s not a number, it won\'t work');
			return;
		}
		gridY = n;
		gridHeight = Math.ceil(height / gridY);
		deleteEverything();
	}
}