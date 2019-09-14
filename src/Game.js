import React, {useState, useRef} from "react";
import Board from "./Board";
import "./Game.css";

function initializePlayerStateMap() {
    return {
        rows: new Array(3).fill(0),
        cols: new Array(3).fill(0),
        diag: 0,
        antiDiag: 0
    };
}

function getCoordinates(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return [row, col];
}

function updateStateMapRef(coordinate, stateMapRef) {
    const [row, col] = coordinate;
    const stateMap = stateMapRef.current;

    stateMap["rows"][row]++;
    stateMap["cols"][col]++;

    if (row === col) {
        stateMap["diag"]++;
    } 
    
    if (row + col === 2) {
        stateMap["antiDiag"]++;
    }
}

function determineWinner(stateMapRef) {
    const stateMap = stateMapRef.current;

    const rowCounts = stateMap["rows"];
    const colCounts = stateMap["cols"]

    for(let i = 0; i < 3; i++) {
        if (rowCounts[i] === 3 || colCounts[i] === 3) {
            return true;
        }
    }

    return stateMap["diag"] === 3 || stateMap["antiDiag"] === 3;
}

function renderGameDetail(winner, turn, player) {
    let displayText;

    if (winner) {
        displayText = `Winner: ${player}`;
    } else if (turn === 10 && !winner) {
        displayText = "Draw";
    } else {
        displayText = `Player: ${player}`;
    }

    return (
        <div className="game-detail">
            {displayText}
        </div>
    );
}

function Game() {
    const [player, setPlayer] = useState('O');
    const [board, setBoard] = useState(new Array(9).fill(""));
    const [winner, setWinner] = useState(null);
    const [turn, setTurn] = useState(1);

    const oStateMapRef = useRef(initializePlayerStateMap());
    const xStateMapRef = useRef(initializePlayerStateMap());

    return (
        <div className="game">
            {renderGameDetail(winner, turn, player)}
            <Board
                board={board}
                onBoxClick={(index) => {
                    if (board[index] !== "" || winner) {

                        if (winner) {
                            alert("Game is over, reset to play again!");
                        }

                        return;
                    }   

                    const boardCopy = board.slice();
                    boardCopy[index] = player;
                    setBoard(boardCopy);

                    const coordinate = getCoordinates(index);
                    const stateMapRef = player === "X" ? xStateMapRef : oStateMapRef;
                    updateStateMapRef(coordinate, stateMapRef);
                    
                    if (determineWinner(stateMapRef)) {
                        setWinner(player);
                    } else {
                        const nextPlayer = player === "X" ? "O" : "X";
                        setPlayer(nextPlayer);
                    }

                    setTurn(turn + 1);
                }}
            />
            <button className="reset-game-button"
                onClick={() => {
                    setPlayer("O");
                    setBoard(new Array(9).fill(""));
                    setWinner(null);
                    setTurn(1);

                    oStateMapRef.current = initializePlayerStateMap();
                    xStateMapRef.current = initializePlayerStateMap();
                }}
            >
                Reset Game
            </button>
        </div>
    );
};

export default Game;