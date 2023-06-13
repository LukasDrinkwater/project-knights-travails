import _, { find } from "lodash";
import "./styles.css";

class Square {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.possibleMoves = [];
    this.knight = false;
  }
  toString() {
    return ` (${this.row},${this.col})`;
  }
}

class Board {
  constructor() {
    this.boardArray = [];
  }

  createGameboard() {
    let boardArray = this.boardArray;
    let rowArray = [];

    for (let i = 0; i < 8; i++) {
      boardArray[i] = [];
      for (let j = 0; j < 8; j++) {
        let square = new Square(i, j);
        boardArray[i][j] = square;
      }
    }

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let square = boardArray[row][col];
        this.findLegalMoves(square);
      }
    }

    return boardArray;
  }
  findLegalMoves(square) {
    let board = this.boardArray;
    let boardSize = 7;
    let row = square.row;
    let col = square.col;
    let moveNum = 0;
    let moveSets = [
      [-1, -2],
      [1, -2],
      [2, -1],
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
    ];

    for (let moveset of moveSets) {
      let moveRow = row + moveset[0];
      let moveCol = col + moveset[1];
      // let moveToSquare = board[moveRow][moveCol];

      // find and store the square you are looking at so you can do squre.movex =
      if (moveRow <= 7 && moveCol <= 7 && moveCol >= 0 && moveRow >= 0) {
        // let moveToSquare = board[moveRow][moveCol];
        // link the current square square
        square.possibleMoves.push(new Square(moveRow, moveCol));
        moveNum++;
      }
    }

    //each moveset adds or takes away from the current x,y values of the square

    //for each squre, check to see if + or - each move set makes the col/row
    //greater than 7 or < 0

    //if it doesnt get the square that the move set makes and add it to
    //one of the this.movex proporties of the current square you are checking

    //getting the current square will be similar to making them boardArray[i][j]
  }
  findMinMoves(startArray, endArray) {
    let moveHistory = [];
    const count = 0;
    let startSquare;
    let endSquare;

    while (!startSquare && !endSquare) {
      for (let square of this.boardArray) {
        console.log(square);
        if (square.row === startArray[0] && square.col === startArray[1]) {
          startSquare = square;
          moveHistory.push(square);
          console.log(square);
        }
        if (square.row === endArray[0] && square.col === endArray[1]) {
          endSquare = square;
          console.log(square);
        }
      }
    }

    function findMinMovesRec(startSquare, endSquare) {}

    while (moveHistory.length > 0) {
      const square = moveHistory.shift();

      for (const move of square.possibleMoves) {
        moveHistory.push(move);
      }

      // shift first element off of the queue

      //then visit that square, enqueue that squares children

      // then  shift the first element and enqueue that squares children

      // if a square is already in the queue dont add it again  so it doesnt go
      // back to the square that the children came from********
    }
  }
}

let board = new Board();

let gameboard = board.createGameboard();

for (let i = 0; i < 8; i++) {
  let boardString = "";
  for (let j = 0; j < 8; j++) {
    boardString += board.boardArray[i][j].toString();
  }
  console.log(boardString);
}

console.log(board.boardArray);

board.findLegalMoves(gameboard);

board.findMinMoves([0, 0], [1, 2]);
