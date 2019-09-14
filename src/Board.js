import React from "react";
import "./Board.css";

const Board = (props) => {
    const {board, onBoxClick} = props;

    return (
        <div className="board">
            {
                board.map((val, index) => {
                    return (
                        <div 
                            className="box"
                            key={index}
                            onClick={() => onBoxClick(index)}
                        >
                            {val}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Board;