import { drawRect, drawString, drawLine, drawCircle, drawTrapeze, drawTriangle, drawRoundedRect, drawSaveButton, drawLoadButton } from "../graphics.js";
import { levelIsEmpty } from "../engineFunctions.js";
import { Block } from "./Block.js";
import { Enemy } from "./Enemy.js";
import { Eraser } from "./Eraser.js";
import { Player } from "./Player.js";
import { SpikesBlock } from "./SpikesBlock.js";

export class Board {
	constructor() {
		// variables and constants
		this.name = 'board';
		this.topHeight = (width > height? height : width)/3;
		this.bottomHeight = (width > height? height : width)/6;
		this.displayed = false;
		this.fontSize = this.bottomHeight/3;
		
		// buttons and things idk
			// top things
			let arrowSize = this.topHeight / 2;
			let displayedBoardSampleObjectBoxSize = 3 * this.topHeight / 4;
			this.closeBoard = {
				x: sampleObjectCanvas.width/5,
				y: sampleObjectCanvas.width/5,
				width: this.topHeight/4,
				height: this.topHeight/4,
				alpha: 1,
				canvas: 0,
				color: "#FFF",
			};
			
			let closeCanvas = document.createElement('canvas');
			let closeCtx = closeCanvas.getContext('2d');
			closeCtx.fillStyle = this.closeBoard.color;
			drawCircle({
				x: 0, y: 0, width: this.topHeight/4, height: this.topHeight/4
			}, closeCtx);
			closeCtx.lineWidth = Math.max(1, width/180);
			closeCtx.strokeStyle = "#800";
			let crossedLine = {
				x1: this.closeBoard.width/4,
				y1: this.closeBoard.height/4,
				x2: this.closeBoard.width/4*3,
				y2: this.closeBoard.height/4*3,
			};
			drawLine(crossedLine, closeCtx);
			drawLine(crossedLine.x2, crossedLine.y1, crossedLine.x1, crossedLine.y2, closeCtx);
			this.closeBoard.canvas = closeCanvas;
			
			
			let undoCanvas = document.createElement('canvas');
			let undoCtx = undoCanvas.getContext('2d');
			
			this.buttonUndo = {
				x: sampleObjectCanvas.width/5,
				y: sampleObjectCanvas.width/5 + this.topHeight/5 * 3,
				width: this.topHeight/4,
				height: this.topHeight/4,
				alpha: 1,
				canvas: 0
			};
			
			undoCanvas.height = undoCanvas.width = this.buttonUndo.width;
			undoCtx.fillStyle = "#FFF";
			drawRoundedRect({x: 0, y: 0, height: this.buttonUndo.height, width: this.buttonUndo.width}, undoCtx);
			undoCtx.fillStyle = "#000";
			let undoTriangle = {
				x1: undoCanvas.width - undoCanvas.width/4,
				y1: undoCanvas.height/4,
				x2: undoCanvas.width/4,
				y2: undoCanvas.height/2,
				x3: undoCanvas.width - undoCanvas.width/4,
				y3: undoCanvas.height - undoCanvas.height/4
			}
			drawTriangle(undoTriangle, undoCtx);
			this.buttonUndo.canvas = undoCanvas;

			this.displayedBoardSampleObjectBox = {
				x: (width - displayedBoardSampleObjectBoxSize) / 2,
				y: (this.topHeight - displayedBoardSampleObjectBoxSize) / 2,
				width: displayedBoardSampleObjectBoxSize,
				height: displayedBoardSampleObjectBoxSize,
				alpha: 1,
				borderRadius: displayedBoardSampleObjectBoxSize/5,
			};
			let displayedBoardSampleObjectImageSize = 2 * this.displayedBoardSampleObjectBox.width/3;
			let image = {
				x: (width - displayedBoardSampleObjectImageSize)/2,
				y: (this.topHeight - displayedBoardSampleObjectImageSize) / 2,
				width: displayedBoardSampleObjectImageSize,
				height: displayedBoardSampleObjectImageSize,
				specialObject: true
			};
			this.displayedBoardSampleObject = [];
			for(let i=0; i <= constSpikesBlock; i++) {
				switch(i) {
						case constEraser:
							this.displayedBoardSampleObject.push(new Eraser(image));
							break;
						case constBlock:
							this.displayedBoardSampleObject.push(new Block(image));
							break;
						case constEnemy:
							this.displayedBoardSampleObject.push(new Enemy(image));
							break;
						case constPlayer:
							this.displayedBoardSampleObject.push(new Player(image));
							break;
						case constSpikesBlock:
							this.displayedBoardSampleObject.push(new SpikesBlock(image));
							break;
					}
				}
			this.leftArrow = {
				x: this.displayedBoardSampleObjectBox.x - arrowSize/4,
				y: (this.topHeight - arrowSize) / 2,
				alpha: 1,
				width: -arrowSize,
				height: arrowSize
			};
			this.rightArrow = {
				x: this.displayedBoardSampleObjectBox.x + this.displayedBoardSampleObjectBox.width + arrowSize/4,
				y: (this.topHeight - arrowSize) / 2,
				alpha: 1,
				width: arrowSize,
				height: arrowSize
			};
			
			// bottom things
			this.gridButton = {
				x: (width - this.bottomHeight/6*5) / 2,
				y: height - this.bottomHeight/6*5,
				width: this.bottomHeight/3*2,
				height: this.bottomHeight/3*2,
				alpha: 1,
				turnedOnColor: "#FFF",
				turnedOffColor: "#98B"
			}
			this.gridYButton = {
				x: this.gridButton.x + this.bottomHeight,
				y: height - this.bottomHeight/6*5,
				width: this.bottomHeight,
				height: this.bottomHeight/3*2,
				alpha: 1,
				borderRadius: this.bottomHeight/6,
				color: "#FFF",
			}
			this.gridXButton = {
				x: this.gridButton.x - this.bottomHeight/3*4,
				y: height - this.bottomHeight/6*5,
				width: this.bottomHeight,
				height: this.bottomHeight/3*2,
				alpha: 1,
				borderRadius: this.bottomHeight/6,
				color: "#FFF",
			}
			
			// undisplayed board things
			this.undisplayedBoardSampleObjectBox = { // this one is not drawn in the main canvas, but it is in the sampleObjectCanvas
				x: 0, // so, this is 0 in the sampleObjectCanvas, but it is actually sampleObjectCanvas.width/5 on the main canvas
				y: 0,
				width: sampleObjectCanvas.width,
				height: sampleObjectCanvas.height,
				alpha: .5,
				borderRadius: sampleObjectCanvas.width/4,
				color: "#FFF",
			};
			
			this.eraseAll = {
				x: width - sampleObjectCanvas.width/5 - this.topHeight/4,
				y: sampleObjectCanvas.width/5,
				width: this.topHeight/4,
				height: this.topHeight/4,
				alpha: 1,
				borderRadius: this.topHeight/16,
				canvas: 0,
			};
				let eraseCanvas = document.createElement('canvas');
				eraseCanvas.height = this.eraseAll.height;
				eraseCanvas.width = this.eraseAll.width;
				let eraseCtx = eraseCanvas.getContext('2d');
				eraseCtx.fillStyle = '#FFF';
				drawRoundedRect({x: 0, y: 0, width: this.eraseAll.width, height: this.eraseAll.height}, eraseCtx);
				eraseCtx.fillStyle = "#000"
				let trash1 = {
					x: this.eraseAll.width/8*3,
					y: this.eraseAll.height/5,
					width: this.eraseAll.width/4,
					height: this.eraseAll.height/20
				}
				let trash2 = {
					x: this.eraseAll.width/4,
					y: this.eraseAll.height/20*5,
					width: this.eraseAll.width/2,
					height: this.eraseAll.height/10
				}
				let trashTrapeze = {
					x1: trash2.x,
					y1: trash2.y + this.eraseAll.height/20*3,
					x2: trash2.x + trash2.width,
					y2: trash2.y + this.eraseAll.height/20*3,
					x3: trash2.x + trash2.width/4*3,
					y3: trash2.y + this.eraseAll.height/5*3,
					x4: trash2.x + trash2.width/4,
					y4: trash2.y + this.eraseAll.height/5*3
				}
				drawRect(trash1, eraseCtx);
				drawRect(trash2, eraseCtx);
				drawTrapeze(trashTrapeze, eraseCtx);
			this.eraseAll.canvas = eraseCanvas;
			
				// start the canvas
				let playCanvas = document.createElement('canvas');
				let stopCanvas = document.createElement('canvas');
				playCanvas.width = stopCanvas.width = sampleObjectCanvas.width;
				playCanvas.height = stopCanvas.height = sampleObjectCanvas.height;
				let playCtx = playCanvas.getContext('2d');
				let stopCtx = stopCanvas.getContext('2d');
				// paint on the canvas
				playCtx.fillStyle = stopCtx.fillStyle = "#FFF";
				drawRoundedRect(this.undisplayedBoardSampleObjectBox, playCtx);
				drawRoundedRect(this.undisplayedBoardSampleObjectBox, stopCtx);
				playCtx.fillStyle = "#0A0";
				stopCtx.fillStyle = "#A00";
				let valor = this.undisplayedBoardSampleObjectBox.width/5;
				let rect = {
					x: valor,
					y: valor,
					width: valor*3,
					height: valor*3
				};
				drawRect(rect, stopCtx)
				drawTriangle(rect, playCtx)
				
			this.buttonPlay = { // this one IS drawn in the main canvas
				x: width - playCanvas.width/5 * 6,
				y: playCanvas.width/5,
				width: playCanvas.width,
				height: playCanvas.height,
				alpha: .5,
				playCanvas: playCanvas, //"#0A0",
				stopCanvas: stopCanvas //"#A00"
			};
			
			// a canvas for the save button
				let saveCanvas = document.createElement('canvas');
				saveCanvas.height = this.eraseAll.height;
				saveCanvas.width = this.eraseAll.width;
				let ww = saveCanvas.width, hh = saveCanvas.height,
					xx = ww/6, yy = hh/6;
				
				let black = {
					x1: xx,
					y1: yy,
					x2: ww - ww/6 - xx,
					y2: yy,
					x3: ww - xx,
					y3: hh/6 + yy,
					x4: ww - xx,
					y4: hh - yy,
					x5: xx,
					y5: hh - yy,
					borderRadius: ww/8
				};
				let whiteRect = {
					x: xx + xx/2,
					y: yy + yy/2,
					width: ww/3,
					height: hh/7,
					borderRadius: ww/16
				};
				let whiteCircle = {
					x: ww/10*4,
					y: hh/10*6 - yy/4,
					width: ww/5,
					height: hh/5
				};
				let saveCtx = saveCanvas.getContext('2d');
				let saveBackground = {
					borderRadius: this.eraseAll.borderRadius,
					x: 0, y: 0,
					width: this.eraseAll.width,
					height: this.eraseAll.height
				};
				drawSaveButton(saveBackground, black, whiteRect, whiteCircle, saveCtx);/**/
				
			this.buttonSave = {
				x: this.eraseAll.x,
				y: this.eraseAll.y + saveCanvas.height/5 * 6,
				width: saveCanvas.width,
				height: saveCanvas.height,
				alpha: 1,
				canvas: saveCanvas
			};
			
				let loadCanvas = document.createElement('canvas');
				loadCanvas.height = this.eraseAll.height;
				loadCanvas.width = this.eraseAll.width;
				let folder = {
					x1: xx,
					x2: xx/3*4,
					x3: ww/2 - xx/2,
					x4: ww/2,
					x5: ww - xx/3*4,
					x6: ww - xx,
					y1: yy,
					y2: yy/3*4,
					y3: yy*2,
					y4: yy/2*5,
					y5: hh - yy
				};
			let loadCtx = loadCanvas.getContext('2d');
			drawLoadButton(saveBackground, folder, loadCtx);
			
			this.buttonLoad = {
				x: this.eraseAll.x,
				y: this.eraseAll.y + loadCanvas.height/5 * 12,
				width: loadCanvas.width,
				height: loadCanvas.height,
				alpha: 1,
				canvas: loadCanvas
			};
			
			console.log()
	}
	
	draw(ctx) {
		if(this.displayed) {
			this.drawBoard(ctx);
		}
		else { // No está desplegado el menú
			if(!playing) {
				sampleObjetcCtx.fillStyle = this.undisplayedBoardSampleObjectBox.color;
				drawRoundedRect(this.undisplayedBoardSampleObjectBox, sampleObjetcCtx);
				sampleObject[selectedObject].draw(sampleObjetcCtx);
				let position = sampleObjectCanvas.width/5;
				ctx.globalAlpha = this.undisplayedBoardSampleObjectBox.alpha;
				//ctx.globalAlpha = ".5";
				ctx.drawImage(sampleObjectCanvas, position, position);
			}
			
			// playing
			let thePlayImage = this.buttonPlay.playCanvas;
			if(playing)
				thePlayImage = this.buttonPlay.stopCanvas;
			ctx.globalAlpha = this.buttonPlay.alpha;
			ctx.drawImage(thePlayImage, this.buttonPlay.x, this.buttonPlay.y)
			ctx.globalAlpha = "1";
		}
	}
	
	drawBoard(ctx) {
		// purple background
		ctx.fillStyle = "#A58FFF";
		let topRect = {
			x: 0,
			y: 0,
			width: width,
			height: this.topHeight
		};
		drawRect(topRect, ctx);
		let bottomRect = {
			x: 0,
			y: height - this.bottomHeight,
			width: width,
			height: this.bottomHeight
		};
		drawRect(bottomRect, ctx);
		
		// top things
			// close button
			ctx.globalAlpha = this.closeBoard.alpha;
			ctx.drawImage(this.closeBoard.canvas, this.closeBoard.x, this.closeBoard.y);
			
			if(lastActions.length == 0)
				ctx.globalAlpha = .5;
			else
				ctx.globalAlpha = this.buttonUndo.alpha;
			ctx.drawImage(this.buttonUndo.canvas, this.buttonUndo.x, this.buttonUndo.y);
			
			// white sample object box
			ctx.fillStyle = "#FFF";
			ctx.globalAlpha = this.displayedBoardSampleObjectBox.alpha;
			drawRoundedRect(this.displayedBoardSampleObjectBox, ctx);			
			// sample object image
			ctx.drawImage(this.displayedBoardSampleObject[selectedObject].canvas,
				this.displayedBoardSampleObject[selectedObject].x,
				this.displayedBoardSampleObject[selectedObject].y
			);
			// sample object and sample object name
			ctx.fillStyle = "#FFF";
			ctx.globalAlpha = 1;
			drawRoundedRect({
				x: this.displayedBoardSampleObjectBox.x,
				y: this.displayedBoardSampleObjectBox.y + this.topHeight - this.fontSize/3,
				width: this.displayedBoardSampleObjectBox.width,
				height: this.fontSize * 1.5,
				borderRadius: this.fontSize/2,
			}, ctx);
			ctx.fillStyle = this.displayedBoardSampleObject[selectedObject].color;
			drawString(this.displayedBoardSampleObject[selectedObject].x,
				this.displayedBoardSampleObject[selectedObject].y + this.topHeight,
				this.displayedBoardSampleObject[selectedObject].name, ctx);
			
			// arrows
			ctx.fillStyle = "#845FCC";
			ctx.globalAlpha = this.rightArrow.alpha;
			drawTriangle(this.rightArrow, ctx);
			ctx.globalAlpha = this.leftArrow.alpha;
			drawTriangle(this.leftArrow, ctx);
			
			// erase, save and load buttons
			if(levelIsEmpty())
				ctx.globalAlpha = .5;
			else
				ctx.globalAlpha = this.eraseAll.alpha;
			ctx.drawImage(this.eraseAll.canvas, this.eraseAll.x, this.eraseAll.y);
			ctx.globalAlpha = this.buttonSave.alpha;
			ctx.drawImage(this.buttonSave.canvas, this.buttonSave.x, this.buttonSave.y);
			ctx.globalAlpha = this.buttonLoad.alpha;
			ctx.drawImage(this.buttonLoad.canvas, this.buttonLoad.x, this.buttonLoad.y);
		
		// bottom things
			// grid button
			ctx.fillStyle = displayedGrid ? this.gridButton.turnedOnColor : this.gridButton.turnedOffColor;
			ctx.globalAlpha = this.gridButton.alpha;
			drawCircle(this.gridButton, ctx);
			ctx.lineWidth = Math.max(1, width/400);
			ctx.strokeStyle = "#000";
			let horizontalLine = {
				x1: this.gridButton.x+this.gridButton.width/3,
				y1: this.gridButton.y+this.gridButton.height/6,
				x2: this.gridButton.x+this.gridButton.width/3,
				y2: this.gridButton.y+this.gridButton.height/6*5,
			}
			drawLine(horizontalLine, ctx);
			drawLine(horizontalLine.x1 + this.gridButton.width/3, horizontalLine.y1, horizontalLine.x2 + this.gridButton.width/3 , horizontalLine.y2, ctx);
			let verticalLine = {
				x1: this.gridButton.x+this.gridButton.width/6,
				y1: this.gridButton.y+this.gridButton.height/3,
				x2: this.gridButton.x+this.gridButton.width/6*5,
				y2: this.gridButton.y+this.gridButton.height/3,
			}
			drawLine(verticalLine, ctx);
			drawLine(verticalLine.x1, verticalLine.y1 + this.gridButton.height/3, verticalLine.x2 , verticalLine.y2 + this.gridButton.height/3, ctx);
			
			// grid buttons
			ctx.font = this.fontSize + "px sans-serif";
			ctx.fillStyle = "#FFF";
			ctx.globalAlpha = this.gridYButton.alpha;
			drawRoundedRect(this.gridYButton, ctx);
			ctx.fillStyle = "#640999";
			drawString(this.gridYButton.x + this.bottomHeight/10, this.gridYButton.y + this.gridYButton.height/3*2, 'Y: '+gridY, ctx);
			ctx.fillStyle = "#FFF";
			ctx.globalAlpha = this.gridXButton.alpha;
			drawRoundedRect(this.gridXButton, ctx);
			ctx.fillStyle = "#640999";
			drawString(this.gridXButton.x + this.bottomHeight/10, this.gridXButton.y + this.gridXButton.height/3*2, 'X: '+gridX, ctx);
	}
}