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
    //uses to print out what the gameboard looks like
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

    // for in for that makes the gameboard array.
    for (let i = 0; i < 8; i++) {
      boardArray[i] = [];
      for (let j = 0; j < 8; j++) {
        let square = new Square(i, j);
        boardArray[i][j] = square;
      }
    }
    // pass each square from the gameboard array into the findLegalMove function
    for (const square of boardArray) {
      this.findLegalMoves(square);
    }

    return boardArray;
  }
  // helper function to get a specific square from the array by taking in a
  // row and ol
  getSquareFromCoordinaes(row, col) {
    const square = this.boardArray[row][col];
    return square;
  }
  // function that gets the path that was taken to get to the target square
  getSquarePath(startSquare, square, path) {
    if (square === startSquare) {
      console.log(`Found the path in ${path.length} moves`);
      path.forEach((element) => {
        console.log(`[${element.row},${element.col}] `);
      });
      return;
    } else {
      path.push(square);
      // if the square isnt the start square recursively call the function
      //by passing the current squares square.moveHistory link in
      return this.getSquarePath(startSquare, square.moveHistory, path);
    }
  }
  // find all the possbile move for each square in the array
  // If a move is legal it pushes it to the current squres possibleMove property
  findLegalMoves(squareArray) {
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
    // each the 2 values are added or subtracted from the current square to get the
    // legal move square.
    for (let moveset of moveSets) {
      for (let square of squareArray) {
        let row = square.row;
        let col = square.col;
        let moveRow = row + moveset[0]; // adds/subtracts the value to get new row/col
        let moveCol = col + moveset[1];

        // checks to see if the move would go out the confines of the board
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
  // main method that finds the minimum amount of moves.
  findMinMoves(startArray, endArray) {
    let queue = [];
    let visisted = new Set(); // a set can only have 1 of each value
    let movePath = {};

    let board = this.boardArray;

    let startSquare = this.getSquareFromCoordinaes(
      startArray[0],
      startArray[1]
    );
    // add the start square to the queue so it can be shifted off the array
    // to start the while loop
    queue.push(startSquare);
    let endSquare = this.getSquareFromCoordinaes(endArray[0], endArray[1]);

    movePath[startSquare.moveHistory] = null;

    while (queue.length > 0) {
      let square = queue.shift();
      // if the square the has been shifted of the queue matches the end sqaure
      // go into the if
      if (square.row === endSquare.row && square.col === endSquare.col) {
        console.log("found the path");
        // calls the getSqaurePath function and passes the square and a blank array
        console.log(this.getSquarePath(startSquare, square, []));
        return;
      }
      // takes each move from the current squares .possibleMoves property and pushes it
      // to the queue and adds it to the visited Set
      for (const move of square.possibleMoves) {
        if (!visisted.has(move)) {
          visisted.add(move);
          queue.push(move);

          move.moveHistory = square;
        }
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

// prints out the gameboard
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
