import React, { useState } from "react";
import styled, { css } from "styled-components";
const Styled = styled.div`
font-family: 'Finger Paint', cursive;
.main{
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
}
span{
  text-align: center;
  font-size: 2rem;
  margin: 20px 0 50px;
}
.wrapper{
  display: grid;
  grid-template-columns: auto auto auto;
  margin: 0 auto;
  .square:not(.o):not(.x):hover:before{
  ${({ navbat }) =>
    navbat == "o"
      ? css`
        content: "o";
      `
      : css`
        content: "x";
      `};
      color: #868686;
      font-size: 100px;
      font-weight: bold;
    }
  
    .square{
      display: flex;
      height: 100px;
      width: 100px;
      border: 1px solid #000;
      color: #000;
      font-size: 100px;
      font-weight: bold;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      &.win{
        color: red
      }
    }
    .square:first-child,
    .square:nth-child(2),
    .square:nth-child(3){
      border-top: none;
    }
    .square:last-child,
    .square:nth-child(7),
    .square:nth-child(8){
      border-bottom: none;
    }
      .square:nth-child(1),
    .square:nth-child(4),
    .square:nth-child(7){
      border-left: none;
    }
          .square:nth-child(3),
    .square:nth-child(6),
    .square:nth-child(9){
      border-right: none;
    }
    
  }
  button{
    width: min-content;
    border: none;
    background-color: #000;
    font-size: 20px;
    padding: 5px 10px;
    color: #fff;
    border-radius: 7px;
    margin: 0 auto 30px;
  }
`;
const App = () => {
  const [navbat, setNavbat] = useState("o");
  const [win, setWin] = useState(false);
  const [wc, setWC] = useState([]);
  const [data, setData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const checkWin = (data, pos) => {
    return winCombos.some((combination) => {
      // return combination.every((index) => {
      //   return data[index] == pos;
      // });
      if (combination.every((index) => {
        return data[index] == pos;
      })) {
        setWC(combination)
        return true
      } else {
        return false
      }
    });
  };
  console.log(wc);
  const clickSquare = (pos) => {
    if (win) return;

    if (data[pos] !== "") return;

    let newData = data;
    newData[pos] = navbat;

    setData(newData);
    setNavbat((prev) => (prev == "o" ? "x" : "o"));
    if (checkWin(newData, navbat)) {

      endGame(true);
    } else if (isDraw()) {
      endGame(false);
    }
  };
  const endGame = (isDraw) => {
    isDraw ? setWin(`${navbat} - g'olib`) : setWin(`Durrang`);
  };
  const getValue = (pos) => {
    let newData = data;

    return newData[pos];
  };
  const restart = () => {
    startGame();
  };
  const startGame = () => {
    setData({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
    });
    setWin(false);
    setNavbat("o");
    setWC([])
  };
  const isDraw = () => {
    return Object.values(data).every((i) => i == "x" || i == "o");
  };
  const isWinSquare = (pos) => {
    if (JSON.stringify(wc).includes(pos)) {
      return 'win'
    } else {
      return ''
    }
  }
  return (
    <Styled navbat={navbat}>
      <div className="main">
        <span>{win ? win : `Tic Tac Toe o'yini`}</span>
        <button onClick={() => restart()}>Yangilash</button>
        <div className="wrapper">
          {Object.keys(data).map((k) => (
            <div className={`square ${getValue(k)} ${isWinSquare(k)}`} key={k} onClick={() => clickSquare(k)}>
              {getValue(k)}
            </div>
          ))}
        </div>
      </div>
    </Styled>
  );
};

export default App;
