var cBoard = new Array(120);

var PIECES = { EMPTY: 0, wP: 1, wR: 2, wN: 3, wB: 4, wQ: 5, wK: 6, // white Pawn, Rook, kNight, Bishop, Queen, King
						bP: 7, bR: 8, bN: 9, bB: 10, bQ:11, bK: 12}; // black Pawn, Rook, kNight, Bishop, Queen, King 

var MOVES = {INVALID:0, NORMAL: 1, CAPTURE: 2, CASTLE_L: 3, CASTLE_R: 4};

var selectedRow = -1;
var selectedCol = -1;
var BOOL = {TRUE: 1, FALSE: 0};
var COLOR = {WHITE: 1, BLACK: 0};
var currentTurn = COLOR.WHITE;

var PieceChar = ".PRNBQKprnbqk";

var blackKingMoved = false;
var blackRookAMoved = false;
var blackRookHMoved = false;
var whiteKingMoved = false;
var whiteRookAMoved = false;
var whiteRookHMoved = false;

// converting from indexes in the 120-array to xy-coordinates in a 8x8 board
function sqr120toXY(sqr120) {
	var row = Math.floor(sqr120/10) - 1;
	var col = sqr120 % 10;
	return {row: row, col: col};
}

// converting from indexes in the 64-array to 120-array
function sqr64to120(sqr64) {
	var result = 10 + getRank(sqr64) * 10 + getFile(sqr64);
	return result;
}

// converting from xy-coordinates in a 8x8 board to indexes in the 64-array
function sqr64(row, col) {
	return ((row - 1) * 8 + col);
}

// getting the y-coordinate from the index in 64-array
function getFile(sqr64) {
	result = (sqr64%8);
	if (result == 0) 
		result = 8;
	return result;
}

// getting the x-coordinate from the index in 64-array
function getRank(sqr64) {
	result = Math.floor((sqr64-1)/8) + 1;
	return result;
}

// move the piece from source to destination if the move is valid
function movePiece(srank, sfile, drank, dfile) {
	var sourceSqr = sqr64to120(sqr64(srank, sfile));
	var destinationSqr = sqr64to120(sqr64(drank, dfile));
	var valid = validMove(sourceSqr, destinationSqr);
	updateRookStatus(sourceSqr);
	if (valid) {
		cBoard[destinationSqr] = cBoard[sourceSqr];
		cBoard[sourceSqr] = PIECES.EMPTY;
		if (valid == MOVES.CASTLE_L) {
			if (currentTurn == COLOR.WHITE) { // White left castle
				cBoard[94] = PIECES.wR;
				cBoard[91] = PIECES.EMPTY;
				whiteKingMoved = true;
				whiteRookAMoved = true;
			} else { // Black left castle
				cBoard[24] = PIECES.bR;
				cBoard[21] = PIECES.EMPTY;
				blackKingMoved = true;
				blackRookAMoved = true;
			}
		}

		if (valid == MOVES.CASTLE_R) {
			if (currentTurn == COLOR.WHITE) { // White right castle
				cBoard[96] = PIECES.wR;
				cBoard[98] = PIECES.EMPTY;
				whiteKingMoved = true;
				whiteRookHMoved = true;
			} else { // Black riht castle
				cBoard[26] = PIECES.bR;
				cBoard[28] = PIECES.EMPTY;
				blackKingMoved = true;
				blackRookHMoved = true;
			}
		}

		currentTurn ^= 1; // changing turn
		setupBoard(); //Reset the GUI after each move
	}
}

// Update castling status of rooks
function updateRookStatus(sqr120) {
	if (sqr120 == 21) //Black A Rook
		blackRookAMoved = true;
	if (sqr120 == 28) //Black H Rook
		blackRookHMoved = true;
	if (sqr120 == 91) //White A Rook
		whiteRookAMoved = true;
	if (sqr120 == 98) //White H Rook
		whiteRookHMoved = true;
}


// Initialize the default new game board
function initBoard() {
	// init off-board squares
	for ( var i = 0; i < 120; i++ )
		cBoard[i] = -1;
	// init empty squares
	for ( var i = 21; i < 99; i++ ) 
		if (i%10 != 0 && i%10 != 9)
			cBoard[i] = PIECES.EMPTY;

	for (var file = 1; file <= 8; file++) {
		var sqr64 = 8 + file;
		cBoard[sqr64to120(sqr64)] = PIECES.bP // black pawn
	}

	for (var file = 1; file <= 8; file++) {
		var sqr64 = 48 + file;
		cBoard[sqr64to120(sqr64)] = PIECES.wP // white pawn
	}

	//major pieces setup
	cBoard[21] = PIECES.bR;
	cBoard[28] = PIECES.bR;
	cBoard[22] = PIECES.bN;
	cBoard[27] = PIECES.bN;
	cBoard[23] = PIECES.bB;
	cBoard[26] = PIECES.bB;
	cBoard[24] = PIECES.bQ;
	cBoard[25] = PIECES.bK;
	cBoard[91] = PIECES.wR;
	cBoard[98] = PIECES.wR;
	cBoard[92] = PIECES.wN;
	cBoard[97] = PIECES.wN;
	cBoard[93] = PIECES.wB;
	cBoard[96] = PIECES.wB;
	cBoard[94] = PIECES.wQ;
	cBoard[95] = PIECES.wK;

	// castling status reset
	blackKingMoved = false;
	blackRookAMoved = false;
	blackRookHMoved = false;
	whiteKingMoved = false;
	whiteRookAMoved = false;
	whiteRookHMoved = false;

}

// Still working and not finished yet, to check if a square is under attack by white
function sqrIsAttacked(sqr) {
	var square = sqr120toXY(sqr);
	var tmp = cBoard[sqr];
	currentTurn ^= 1; // temporary change turn

	if (currentTurn == COLOR.WHITE) { // checking for white attacks
		cBoard[sqr] = PIECES.bP; // temporary remove the piece in that sqr to an opposite pawn
		for (var i = 21; i < 99; i++) {
			var destinationSqr = sqr;
			var sourceSqr = i;
			if (cBoard[sourceSqr] > PIECES.wP && cBoard[sourceSqr] <= PIECES.wK && validMove(sourceSqr, destinationSqr)) {
			// if there is a white piece that can move the the sqr then it is under attack
			// except for pawn move
				cBoard[sqr] = tmp; // reset the original sqr
				currentTurn ^= 1; // reset turn;
				console.log(sourceSqr + " is attacking " + destinationSqr);
				return true;
			}

			if (cBoard[sourceSqr] == PIECES.wP && validWhitePawnMove(sourceSqr, destinationSqr) == MOVES.CAPTURE) {
			// if it a pawn capture move is available then the sqr is under attack
				cBoard[sqr] = tmp; // reset the original sqr
				currentTurn ^= 1; // reset turn;
				console.log(sourceSqr + " is attacking " + destinationSqr);
				return true;	
			}
		}

		// if no attack is available then the sqr is safe
		cBoard[sqr] = tmp; // reset the original sqr
		currentTurn ^= 1; // reset turn;
		return false;	

	} else { // if we are checking for black attacks
		cBoard[sqr] = PIECES.wP; // temporary remove the piece in that sqr to an opposite pawn
		for (var i = 21; i < 99; i++) {
			var destinationSqr = sqr;
			var sourceSqr = i;
			if (cBoard[sourceSqr] > PIECES.bP && cBoard[sourceSqr] <= PIECES.bK && validMove(sourceSqr, destinationSqr)) {
			// if there is a white piece that can move the the sqr then it is under attack
			// except for pawn move
				cBoard[sqr] = tmp; // reset the original sqr
				currentTurn ^= 1; // reset turn;
				console.log(sourceSqr + " is attacking " + destinationSqr);
				return true;
			}

			if (cBoard[sourceSqr] == PIECES.bP && validBlackPawnMove(sourceSqr, destinationSqr) == MOVES.CAPTURE) {
			// if it a pawn capture move is available then the sqr is under attack
				cBoard[sqr] = tmp; // reset the original sqr
				currentTurn ^= 1; // reset turn;
				console.log(sourceSqr + " is attacking " + destinationSqr);
				return true;	
			}
		}

		// if no attack is available then the sqr is safe
		cBoard[sqr] = tmp; // reset the original sqr
		currentTurn ^= 1; // reset turn;
		return false;	
	}
	
}

// check if a move from sourceSquare to destinationSquare is valid
function validMove(sourceSqr, destinationSqr) {
	if (currentTurn == COLOR.WHITE && cBoard[sourceSqr] >= PIECES.wP && cBoard[sourceSqr] <= PIECES.wK) {
		if (cBoard[destinationSqr] == PIECES.EMPTY || (cBoard[destinationSqr] >= PIECES.bP && cBoard[destinationSqr] <= PIECES.bQ)) {
			var sPiece = cBoard[sourceSqr];
			if (sPiece == PIECES.wP) {
				return validWhitePawnMove(sourceSqr, destinationSqr);
			} else if (sPiece == PIECES.wR) {
				return validWhiteRookMove(sourceSqr, destinationSqr);
			} else if (sPiece == PIECES.wN) {
				return validWhiteKnightMove(sourceSqr, destinationSqr);
			} else if (sPiece == PIECES.wB) {
				return validWhiteBishopMove(sourceSqr, destinationSqr);
			} else if (sPiece == PIECES.wQ) {
				return validWhiteQueenMove(sourceSqr, destinationSqr);
			} else if (sPiece == PIECES.wK) {
				return validWhiteKingMove(sourceSqr, destinationSqr);
			}	
		}
	} else if (currentTurn == COLOR.BLACK && cBoard[sourceSqr] >= PIECES.bP && cBoard[sourceSqr] <= PIECES.bK) {
		if (cBoard[destinationSqr] == PIECES.EMPTY || (cBoard[destinationSqr] >= PIECES.wP && cBoard[destinationSqr] <= PIECES.wQ)) {
			var sPiece = cBoard[sourceSqr];
			if (sPiece == PIECES.bP) {
				return validBlackPawnMove(sourceSqr, destinationSqr);
			} else if (sPiece == PIECES.bR) {
				return validBlackRookMove(sourceSqr, destinationSqr);
			} else if (sPiece == PIECES.bN) {
				return validBlackKnightMove(sourceSqr, destinationSqr);
			} else if (sPiece == PIECES.bB) {
				return validBlackBishopMove(sourceSqr, destinationSqr);
			} else if (sPiece == PIECES.bQ) {
				return validBlackQueenMove(sourceSqr, destinationSqr);
			} else if (sPiece == PIECES.bK) {
				return validBlackKingMove(sourceSqr, destinationSqr);
			}
		}
	}
	return MOVES.INVALID;
}

function validWhitePawnMove(sourceSqr, destinationSqr) {
	var srsPos = sqr120toXY(sourceSqr);
	var desPos = sqr120toXY(destinationSqr);
	var desPiece = cBoard[destinationSqr]; // destination piece
	// normal move
	if (srsPos.col == desPos.col && srsPos.row - 1 == desPos.row && desPiece == PIECES.EMPTY) {
		return MOVES.NORMAL;
	}

	// double pawn advance if the pawn is at the original position
	if (srsPos.col == desPos.col && srsPos.row - 2 == desPos.row && srsPos.row == 7 && desPiece == PIECES.EMPTY) { 
		return MOVES.NORMAL;
	}

	// normal capture move
	if ((srsPos.col - 1 == desPos.col || srsPos.col + 1 == desPos.col) && srsPos.row - 1 == desPos.row && desPiece >= PIECES.bP && desPiece <= PIECES.bQ) {
		return MOVES.CAPTURE;
	}

	// en passant 

	return MOVES.INVALID;
}

function validWhiteRookMove(sourceSqr, destinationSqr) {
	if (validRookMove(sourceSqr, destinationSqr)) {
		var desPiece = cBoard[destinationSqr];
		if (desPiece == PIECES.EMPTY || (desPiece >= PIECES.bP && desPiece <= PIECES.bQ)) 
			return true;
	}
	return false;
}

function validWhiteKnightMove(sourceSqr, destinationSqr) {
	if (validKnightMove(sourceSqr, destinationSqr)) {
		var desPiece = cBoard[destinationSqr];
		if (desPiece == PIECES.EMPTY || (desPiece >= PIECES.bP && desPiece <= PIECES.bQ)) 
			return true;
	}
	return false;
}

function validWhiteBishopMove(sourceSqr, destinationSqr) {
	if (validBishopMove(sourceSqr, destinationSqr)) {
		var desPiece = cBoard[destinationSqr];
		if (desPiece == PIECES.EMPTY || (desPiece >= PIECES.bP && desPiece <= PIECES.bQ)) 
			return true;
	}
	return false;
}

function validWhiteQueenMove(sourceSqr, destinationSqr) {
	if (validBishopMove(sourceSqr, destinationSqr) || validRookMove(sourceSqr, destinationSqr)) {
		var desPiece = cBoard[destinationSqr];
		if (desPiece == PIECES.EMPTY || (desPiece >= PIECES.bP && desPiece <= PIECES.bQ)) 
			return true;
	}
	return false;
}

function validWhiteKingMove(sourceSqr, destinationSqr) {
	if (validKingMove(sourceSqr, destinationSqr)) {
		var desPiece = cBoard[destinationSqr];
		if (desPiece == PIECES.EMPTY || (desPiece >= PIECES.bP && desPiece <= PIECES.bQ)) 
			return validKingMove(sourceSqr, destinationSqr);
	}
	return MOVES.INVALID;
}


function validBlackPawnMove(sourceSqr, destinationSqr) {
	var srsPos = sqr120toXY(sourceSqr);
	var desPos = sqr120toXY(destinationSqr);
	var desPiece = cBoard[destinationSqr]; // destination piece
	// normal move
	if (srsPos.col == desPos.col && srsPos.row + 1 == desPos.row && desPiece == PIECES.EMPTY) {
		return MOVES.NORMAL;
	}

	// double pawn advance if the pawn is at the original position
	if (srsPos.col == desPos.col && srsPos.row + 2 == desPos.row && srsPos.row == 2 && desPiece == PIECES.EMPTY) { 
		return MOVES.NORMAL;
	}

	// normal capture move
	if ((srsPos.col - 1 == desPos.col || srsPos.col + 1 == desPos.col) && srsPos.row + 1 == desPos.row && desPiece >= PIECES.wP && desPiece <= PIECES.wQ) {
		return MOVES.CAPTURE;
	}

	// en passant 
	
	return MOVES.INVALID;
}

function validBlackRookMove(sourceSqr, destinationSqr) {
	if (validRookMove(sourceSqr, destinationSqr)) {
		var desPiece = cBoard[destinationSqr];
		if (desPiece == PIECES.EMPTY || (desPiece >= PIECES.wP && desPiece <= PIECES.wQ)) 
			return true;
	}
	return false;
}

function validBlackKnightMove(sourceSqr, destinationSqr) {
	if (validKnightMove(sourceSqr, destinationSqr)) {
		var desPiece = cBoard[destinationSqr];
		if (desPiece == PIECES.EMPTY || (desPiece >= PIECES.wP && desPiece <= PIECES.wQ)) 
			return true;
	}
	return false;
}

function validBlackBishopMove(sourceSqr, destinationSqr) {
	if (validBishopMove(sourceSqr, destinationSqr)) {
		var desPiece = cBoard[destinationSqr];
		if (desPiece == PIECES.EMPTY || (desPiece >= PIECES.wP && desPiece <= PIECES.wQ)) 
			return true;
	}
	return false;
}

function validBlackQueenMove(sourceSqr, destinationSqr) {
	if (validBishopMove(sourceSqr, destinationSqr) || validRookMove(sourceSqr, destinationSqr)) {
		var desPiece = cBoard[destinationSqr];
		if (desPiece == PIECES.EMPTY || (desPiece >= PIECES.wP && desPiece <= PIECES.wQ)) 
			return true;
	}
	return false;
}

function validBlackKingMove(sourceSqr, destinationSqr) {
	if (validKingMove(sourceSqr, destinationSqr)) {
		var desPiece = cBoard[destinationSqr];
		if (desPiece == PIECES.EMPTY || (desPiece >= PIECES.wP && desPiece <= PIECES.wQ)) 
			return validKingMove(sourceSqr, destinationSqr);
	}
	return MOVES.INVALID;
}

function validRookMove(sourceSqr, destinationSqr) {
	var srsPos = sqr120toXY(sourceSqr);
	var desPos = sqr120toXY(destinationSqr);
	var desPiece = cBoard[destinationSqr]; // destination piece
	if (srsPos.row != desPos.row && srsPos.col != desPos.col)
		return false;
	if (srsPos.row == desPos.row) { // moving horizontally
		if (srsPos.col > desPos.col) // move left
			for (var i = srsPos.col - 1; i > desPos.col; i--) {
				var sqr = sqr64to120(sqr64(srsPos.row, i));
				var piece = cBoard[sqr];
				if (piece != PIECES.EMPTY)
					return false;
			}
		else // move right
			for (var i = srsPos.col + 1; i < desPos.col; i++) {
				var sqr = sqr64to120(sqr64(srsPos.row, i));
				var piece = cBoard[sqr];
				if (piece != PIECES.EMPTY)
					return false;
			}
		return true;
	} else if (srsPos.col == desPos.col) { // moving vertically
		if (srsPos.row > desPos.row) // move up
			for (var i = srsPos.row - 1; i > desPos.row; i--) {
				var sqr = sqr64to120(sqr64(i, srsPos.col));
				var piece = cBoard[sqr];
				if (piece != PIECES.EMPTY)
					return false;
			}
		else // move down
			for (var i = srsPos.row + 1; i < desPos.row; i++) {
				var sqr = sqr64to120(sqr64(i, srsPos.col));
				var piece = cBoard[sqr];
				if (piece != PIECES.EMPTY)
					return false;
			}
		return true;
	}
	return false;
}

function validKnightMove(sourceSqr, destinationSqr) {
	var knightMovesRow = [1, 1, -1, -1, 2, 2, -2, -2]; // possible moves for a knight
	var knightMovesCol = [-2, 2, 2, -2, 1, -1, 1, -1];
	var srsPos = sqr120toXY(sourceSqr);
	var desPos = sqr120toXY(destinationSqr);
	for (var i = 0; i < 8; i++) {
		if ((srsPos.row + knightMovesRow[i] == desPos.row) && (srsPos.col + knightMovesCol[i] == desPos.col))
			return true;
	}
	return false;
}

function validBishopMove(sourceSqr, destinationSqr) {
	var spx = 1;
	var spy = 1;
	var srsPos = sqr120toXY(sourceSqr);
	var desPos = sqr120toXY(destinationSqr);
	if (srsPos.row > desPos.row) // moving up
		spx = -1;
	if (srsPos.col > desPos.col) // moving left
		spy = -1;
	var tmp = srsPos;
	while (tmp.row != desPos.row) {
		tmp.row += spx;
		tmp.col += spy;
		if (tmp.row == desPos.row && tmp.col == desPos.col)
			return true;
		var piece = cBoard[sqr64to120(sqr64(tmp.row, tmp.col))];
		if (piece != PIECES.EMPTY)
			return false;
	}
	return false;
}

function validKingMove(sourceSqr, destinationSqr) {
	var moveRow = [1,1,1,0,0,-1,-1,-1]; // possible moves for a king
	var moveCol = [1,0,-1,1,-1,1,0,-1];
	var srsPos = sqr120toXY(sourceSqr);
	var desPos = sqr120toXY(destinationSqr);
	for (var i = 0; i < 8; i++) {
		if ((srsPos.row + moveRow[i] == desPos.row) && (srsPos.col + moveCol[i] == desPos.col))
			return MOVES.NORMAL;
	}

	//castling move check
	if (currentTurn == COLOR.WHITE && desPos.row == 8 && desPos.col == 3) //white left castle
		if (!whiteKingMoved && !whiteRookAMoved) // status check for king and Rook A1
			if (cBoard[92] == PIECES.EMPTY && cBoard[93] == PIECES.EMPTY && cBoard[94] == PIECES.EMPTY) // no pieces between
				if (!sqrIsAttacked(93) && !sqrIsAttacked(94)) // these squares are not attacked by black
					return MOVES.CASTLE_L;

	if (currentTurn == COLOR.WHITE && desPos.row == 8 && desPos.col == 7) //white right castle
		if (!whiteKingMoved && !whiteRookHMoved) // status check for king and Rook H1
			if (cBoard[96] == PIECES.EMPTY && cBoard[97] == PIECES.EMPTY) // no pieces between
				if (!sqrIsAttacked(96) && !sqrIsAttacked(97)) // these squares are not attacked by black
					return MOVES.CASTLE_R;

	if (currentTurn == COLOR.BLACK && desPos.row == 1 && desPos.col == 3) //black left castle
		if (!blackKingMoved && !blackRookHMoved) // status check for king and Rook H1
			if (cBoard[22] == PIECES.EMPTY && cBoard[23] == PIECES.EMPTY && cBoard[24] == PIECES.EMPTY) // no pieces between
				if (!sqrIsAttacked(23) && !sqrIsAttacked(24)) // these squares are not attacked by black
					return MOVES.CASTLE_L;

	if (currentTurn == COLOR.BLACK && desPos.row == 1 && desPos.col == 7) //white right castle
		if (!blackKingMoved && !blackRookHMoved) // status check for king and Rook H1
			if (cBoard[26] == PIECES.EMPTY && cBoard[27] == PIECES.EMPTY) // no pieces between
				if (!sqrIsAttacked(26) && !sqrIsAttacked(27)) // these squares are not attacked by black
					return MOVES.CASTLE_R;

	
	return MOVES.INVALID;
}
