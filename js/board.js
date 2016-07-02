// Initialize functions and methods
window.onload = function() {
	initBoard(); // Initialize the backend chess board
	setupBoard();
}

function setupBoard() {
	initBoardCSS(); // Initialize the GUI board by generating CSS
	initGUIPieces(); // Initialize images of pieces on the GUI
	initGUIClickListener(); // Initialize clicking and selecting pieces
}

// highlight the selected square, if a selection had already been made (the selectedRow & Col != -1) then do the move
function setSelectSqr(row, col) {
	if (selectedRow != -1 || selectedCol != -1) {
		movePiece(selectedRow, selectedCol, row, col);
		deselectSqr(selectedRow, selectedCol);
	} else {
		var className = "rank" + row + " file" + col;
		selectedRow = row;
		selectedCol = col;
		var squares = document.getElementsByClassName(className);
		for (sqr = 0; sqr < squares.length; sqr++)
			squares[sqr].classList.add("selectedSquare");
	}
}

// remove the highlighted from the square
function deselectSqr(row, col) {
	var className = "rank" + row + " file" + col;
	var squares = document.getElementsByClassName(className);
	for (sqr = 0; sqr < squares.length; sqr++)
		squares[sqr].classList.remove("selectedSquare");
	selectedRow = -1;
	selectedCol = -1;
}

function initGUIClickListener() {
	var squares = document.getElementsByClassName("boardSquare");
	for (var sqr = 0; sqr < squares.length; sqr++) {
		squares[sqr].addEventListener('click', function(e) {
			squareClickAction(e.pageX, e.pageY);
		});
	}
}

function squareClickAction(pageX, pageY) {
	var boardPos = getBoardPosition();
	//Getting the coordinates in row & col index by subtract the cliced position by the board position
	//then divide by the image/square size (60) to get the row/col
	var row = Math.floor((pageY - boardPos.top)/ 60) + 1; // 60 = square size
	var col = Math.floor((pageX - boardPos.left)/ 60) + 1; // 60 = square size
	setSelectSqr(row, col);
	//console.log("Clicked square at row " + row + ", col " + col);
}

function getBoardPosition() {
	var theBoard = document.getElementById("chessBoard");
	var left = theBoard.offsetLeft;
	var top = theBoard.offsetTop;
	return {top: Math.round(top), left: Math.round(left)};
}

// initialize the pieces on the board GUI
function initGUIPieces() {
	//theBoard = document.getElementById("chessBoard");
	for (var sqr = 1; sqr <= 64; sqr++ ) {
		var file = getFile(sqr);
		var rank = getRank(sqr);
		var sqr120 = sqr64to120(sqr);
		var piece = cBoard[sqr120];
		var color = "w"
		if (piece >= 7 && piece <= 12) //dark pieces
			color = "b";

		if (piece >= 1 && piece <= 12) { //not empty sqr but an actual piece
			var sqrId = "s" + rank + file;
			var pieceClass = "piece";
			var pieceFileName = "images/" + color + PieceChar[piece].toUpperCase() + ".png";
			var newPiece = document.createElement("img");
			
			//console.log(color + PieceChar[piece].toUpperCase() + " " + sqr + " " + sqr120 + " " + pieceClass);
			newPiece.setAttribute("class", pieceClass);
			newPiece.setAttribute("src", pieceFileName);

			var sqrElement = document.getElementById(sqrId);
			sqrElement.appendChild(newPiece);
		}
	}
}

// Initialize dark and light squares GUI
function initBoardCSS() {
	var color = 0;
	var theBoard = document.getElementById("chessBoard");
	while (theBoard.hasChildNodes()) {
    	theBoard.removeChild(theBoard.lastChild);
	}
	// creating html divs that coresponding to dark squares and lights squares with classes 
	// for css manipulation
	for (var row = 1; row <= 8; row++) {
		for (var col = 1; col <= 8; col++) {
			var s = "light";
			if (color == 1)
				s = "dark";
			//eg class="darksqr rank8 file8"
			var type = "boardSquare " + s + "sqr rank" + row + " file" + col;
			var sqrId = "s" + row + col;
			var newSqr = document.createElement("div");
			newSqr.setAttribute("class", type);
			newSqr.setAttribute("id", sqrId);
			theBoard.appendChild(newSqr);
			color ^= 1;
		}
		color ^= 1;
	}
}

