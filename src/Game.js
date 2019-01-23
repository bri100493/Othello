import React from "react";
import Board from "./Board";

class Game extends React.Component {
  state = {
    rows: [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, "red", "pink", null, null, null],
      [null, null, null, "pink", "red", null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ],

    turn: "red",

    winner: ""
  };

  restartGame = () => {
    this.setState({
      rows: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, "red", "pink", null, null, null],
        [null, null, null, "pink", "red", null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
      ]
    });
  };

  doTurn = (x, y) => {
    let newRows = [...this.state.rows];

    if (newRows[x][y] === null) {
      newRows[x][y] = this.state.turn;

      this.flipPiece(this.state.turn, x, y);

      this.setState({ rows: newRows });
      if (this.state.turn === "red") {
        this.setState({
          turn: "pink"
        });
      }
      if (this.state.turn === "pink") {
        this.setState({
          turn: "red"
        });
      }

      this.winner();
    }
  };

  iterateDirection = (x, y, dx, dy) => {
    let nextIndexX = x + dx;
    let nextIndexY = y + dy;

    const rangeIterator = {
      next: function() {
        let result;
        if (
          nextIndexX >= 0 &&
          nextIndexX < 8 &&
          nextIndexY >= 0 &&
          nextIndexY < 8
        ) {
          result = { value: [nextIndexX, nextIndexY], done: false };
          nextIndexX += dx;
          nextIndexY += dy;
          return result;
        }
        return { done: true };
      }
    };
    return rangeIterator;
  };

  iterateOnFlip = (currPiece, nextPiece, dx, dy) => {
    let iterator = this.iterateDirection(currPiece[0], currPiece[1], dx, dy);
    let result = iterator.next();
    let newRows = [...this.state.rows];
    while (!result.done) {
      currPiece = result.value;
      if (currPiece[0] === nextPiece[0] && currPiece[1] === nextPiece[1]) {
        break;
      }
      newRows[currPiece[0]][currPiece[1]] = this.state.turn;
      result = iterator.next();
    }
    this.setState({ rows: newRows });
  };

  flipPiece = (turn, x, y) => {
    let directionArr = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [-1, -1],
      [-1, 1],
      [1, -1]
    ];
    for (let i = 0; i < directionArr.length; i++) {
      let dx = directionArr[i][0];
      let dy = directionArr[i][1];
      let iterator = this.iterateDirection(x, y, dx, dy);
      let result = iterator.next();
      while (!result.done) {
        let nextPiece = this.state.rows[result.value[0]][result.value[1]];
        if (nextPiece === null) {
          break;
        }
        if (nextPiece === this.state.turn) {
          this.iterateOnFlip([x, y], result.value, dx, dy);
          break;
        }
        result = iterator.next();
      }
    }
  };

  winner = () => {
    let cellArr = [];
    let newRows = [...this.state.rows];
    for (let i = 0; i < newRows.length; i++) {
      let rowArr = newRows[i];
      for (let j = 0; j < rowArr.length; j++) {
        cellArr.push(rowArr[j]);
      }
    }
    if (!cellArr.includes(null)) {
      let redCount = 0;
      let pinkCount = 0;
      for (let c = 0; c < cellArr.length; c++) {
        if (cellArr[c] === "red") {
          redCount++;
        }
        if (cellArr[c] === "pink") {
          pinkCount++;
        }
      }
      if (redCount > pinkCount) {
        this.setState({
          winner: "red"
        });
      } else {
        this.setState({
          winner: "pink"
        });
      }
    }
  };

  render() {
    let gameStatus;
    if (this.state.winner === "") {
      gameStatus = (
        <div className="container">
          <div className="status">
            <span id="currentPlayerLabel">Current Player:</span>
            <span className={`${this.state.turn} piece`} id="currentPlayer" />
          </div>
        </div>
      );
    }

    let gameWinner;
    if (this.state.winner === "red" || this.state.winner === "pink") {
      gameWinner = (
        <div className="container">
          <div className="winnerRestart">
            <div className="winStatus">
              <span className={`${this.state.winner} piece`} id="winner" />
              <span id="winnerLabel">Wins!</span>
            </div>
            <button id="restart" onClick={this.restartGame}>
              Play Again?
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <Board rows={this.state.rows} onClick={this.doTurn} />
        {gameStatus}
        {gameWinner}
      </div>
    );
  }
}

export default Game;
