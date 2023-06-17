import _, { endsWith, find, get } from "lodash";
import "./styles.css";

class Square {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.possibleMoves = [];
    this.knight = false;
    this.moveHistory = null;
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

    for (const square of boardArray) {
      this.findLegalMoves(square);
    }

    return boardArray;
  }
  getSquareFromCoordinaes(row, col) {
    const square = this.boardArray[row][col];
    return square;
  }
  getSquarePath(square, ...path) {
    if (square.moveHistory === square) {
      return console.log(path);
    } else {
      path.push(square);
      return this.getSquarePath(square.moveHistory);
    }
  }
  findLegalMoves(squareArray) {
    let board = this.boardArray;
    let boardSize = 7;

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
      for (let square of squareArray) {
        let row = square.row;
        let col = square.col;
        let moveRow = row + moveset[0];
        let moveCol = col + moveset[1];

        // find and store the square you are looking at so you can do squre.movex =
        if (moveRow <= 7 && moveCol <= 7 && moveCol >= 0 && moveRow >= 0) {
          // link the current square square

          let moveToSquare = this.getSquareFromCoordinaes(moveRow, moveCol);
          square.possibleMoves.push(moveToSquare);
        }
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
    let queue = [];
    let visisted = new Set();
    let movePath = {};

    let board = this.boardArray;

    let startSquare = this.getSquareFromCoordinaes(
      startArray[0],
      startArray[1]
    );
    queue.push(startSquare);
    // visisted.add(startSquare);
    let endSquare = this.getSquareFromCoordinaes(endArray[0], endArray[1]);

    movePath[startSquare.moveHistory] = null;
    // console.log(movePath);

    while (queue.length > 0) {
      let square = queue.shift();

      if (square.row === endSquare.row && square.col === endSquare.col) {
        console.log("found the path");
        console.log(square);
        console.log(this.getSquarePath(square));
        return;
      }

      for (const move of square.possibleMoves) {
        if (!visisted.has(move)) {
          // if (!moveHistory.hasOwnProperty(move.value)) {
          visisted.add(move);
          queue.push(move);

          move.moveHistory = square;
        }
        // The way I did it was to store the previous node on the node entity eg.
        //  If I jump from e3 to f5 I store e3 on f5. Then once I get to the target
        //  square I recursively search previous nodes until I get to the start square.
      }
    }
    // finding the shortest path and remembering it
    // add its neighbours to the queue
    // track where nodes that we're adding are coming from

    //
    // just finding the shortest path
    // shift first element off of the queue

    //then visit that square, enqueue that squares children

    // then  shift the first element and enqueue that squares children

    // if a square is already in the queue dont add it again  so it doesnt go
    // back to the square that the children came from********
    // }
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
