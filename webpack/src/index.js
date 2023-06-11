import _, { find } from "lodash";
import "./styles.css";

class Square {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.move1;
    this.move2;
    this.move3;
    this.move4;
    this.move5;
    this.move6;
    this.move7;
    this.move8;
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
        let moveToSquare = board[moveRow][moveCol];
        // link the current square square
        square["move" + moveNum] = moveToSquare;
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

// console.log(board.findLegalMoves(gameboard));
