import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MyPage = () => {
  const location = useLocation();
  const userEmail = location.state ? location.state.userEmail : null;

  // Square component for the Tic-Tac-Toe game
  const Square = ({ value, onClick }) => {
    const squareStyle = {
      width: '50px',
      height: '50px',
      fontSize: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #000',
      cursor: 'pointer',
    };
    return (
      <button style={squareStyle} onClick={onClick}>
        {value}
      </button>
    );
  };

  // Board component for the Tic-Tac-Toe game
  const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (index) => {
      if (squares[index] || calculateWinner(squares)) {
        return;
      }
      const nextSquares = squares.slice();
      nextSquares[index] = xIsNext ? 'X' : 'O';
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    };

    const resetGame = () => {
      setSquares(Array(9).fill(null));
      setXIsNext(true);
    };

    const renderSquare = (index) => (
      <Square value={squares[index]} onClick={() => handleClick(index)} />
    );

    const winner = calculateWinner(squares);
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

    const boardRowStyle = {
      display: 'flex',
    };

    const statusStyle = {
      marginBottom: '10px',
      fontSize: '24px',
    };

    const buttonStyle = {
      marginTop: '20px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
    };

    return (
      <div>
        <div style={statusStyle}>{status}</div>
        <div style={boardRowStyle}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div style={boardRowStyle}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div style={boardRowStyle}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        {/* ปุ่มเคลียร์เกม */}
        <button style={buttonStyle} onClick={resetGame}>
          เคลียร์เกม
        </button>
      </div>
    );
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh',
    textAlign: 'center',
  };

  const imageStyle = {
    margin: '0px',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
  };

  const gameSectionStyle = {
    marginTop: '-10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={pageStyle}>
      <h1>ยินดีต้อนรับสู่ ระบบล็อกอิน</h1>
      <h1>ขอให้สนุกกับเกม</h1>
      {userEmail && <p>Welcome, {userEmail}!</p>}
      {/* เพิ่มรูปภาพ */}
      <img src="/01.png" alt="Profile" style={imageStyle} />
      {/* เนื้อหาอื่น ๆ ของ MyPage */}
      <div style={gameSectionStyle}>
        <h2>Tic-Tac-Toe Game</h2>
        <Board />
      </div>
    </div>
  );
};

export default MyPage;
