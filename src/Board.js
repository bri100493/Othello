import React from "react";

function Board({ rows, onClick }) {
  return (
    <div className="board">
      {rows.map((row, x) => (
        <div className="row">
          {row.map((cell, y) => (
            <div className="cell" onClick={() => onClick(x, y)}>
              <div className={`piece ${cell || "preview"}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
