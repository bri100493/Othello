import React from "react";
import ReactDOM from "react-dom";
import Game from "./Game";

import "./styles.scss";

function App() {
  return (
    <div className="container">
      <div id="header">
        <span id="title">Play Othello!</span>
      </div>
      <Game title="Othello" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
