import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  inputLetter,
  validateGuess,
  deleteLetter,
  gameStatus,
  replayGame,
} from "./cardSlice";

const Header = styled.div`
  width: 100%;
  height: 150px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: white;
  letter-spacing: 10px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
`;
const Plate = styled.div`
  margin: 0 auto;
  width: 350px;
  height: 420px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Card = styled.div`
  width: calc((100% - 20px) / 5);
  height: calc((100% - 25px) / 6);
  border: 1px solid #3a3a3c;
  color: white;
  background-color: ${(props) => (props.backGround ? props.backGround : "")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

const Btn = styled.div`
  margin: 20px auto;
  width: 200px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #3a3a3a;
  border-radius: 5px;
  color: #3a3a3a;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: #ebebeb;
    color: black;
    font-size: 21px;
  }
`;

const Reg = /^[A-Za-z]$/;

const ans = "Apple";

export function Game() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  const row = useSelector((state) => state.cards.row);
  const column = useSelector((state) => state.cards.column);

  const gameState = useSelector(gameStatus);

  useEffect(() => {
    function keyDownHandler(e) {
      if (Reg.test(e.key) && column < 5 && gameState && row < 6) {
        dispatch(inputLetter({ ans: e.key.toLowerCase() }));
      }

      if (e.key === "Backspace" && column > 0 && gameState) {
        dispatch(deleteLetter());
      }

      if (e.key === "Enter" && column === 5 && gameState) {
        dispatch(validateGuess({ ans: ans.toLowerCase() }));
      }
    }

    window.addEventListener("keydown", keyDownHandler);

    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [cards, column, dispatch, gameState, row]);

  console.log("row:", row, "column:", column, "gameState:", gameState);

  const restartGame = () => {
    dispatch(replayGame());
  };

  return (
    <>
      <Header>Wordle</Header>
      <Wrapper>
        <Plate>
          {cards.map((item, index) => {
            return item.map((unit, j) => {
              return (
                <Card key={index + j} backGround={unit.status}>
                  {unit.letter.toUpperCase()}
                </Card>
              );
            });
          })}
        </Plate>
        <Btn onClick={restartGame}>Restart Game</Btn>
      </Wrapper>
    </>
  );
}
