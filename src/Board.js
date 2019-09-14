import React, {useEffect} from "react";
import "./Board.css";

const Board = (props) => {
    const {board, onBoxClick} = props;

    useEffect(() => {
        console.log("Board rendered");
    });

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