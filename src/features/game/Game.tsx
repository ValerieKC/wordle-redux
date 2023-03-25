import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { RootState } from "../../app/store";
import {
  inputLetter,
  setColor,
  deleteLetter,
  gameStatus,
  replayGame,
  validateGuess,
  correctness,
} from "./cardSlice";
import { useGetTodayQuery } from "./apiSlice";

const Header = styled.div`
  width: 100%;
  height: 150px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: white;
  letter-spacing: 5px;
  font-weight: 900;
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

interface Props {
  borderColor?: string | undefined;
  backGround?: string;
}

const Card = styled.div`
  width: calc((100% - 20px) / 5);
  height: calc((100% - 25px) / 6);
  border: 1px solid #3a3a3c;
  color: white;
  background-color: ${(props:Props) => (props.backGround ? props.backGround : "")};
  border-color: ${(props:Props) =>
    props.borderColor ? "#565758" : "#3a3a3c"};

  ${(props) => props.borderColor && "border-width:2px;"}
  ${(props) => props.borderColor && props.backGround && "border:none;"}

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  text-transform: uppercase;
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

export function Game() {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards.cards);
  const row = useSelector((state: RootState) => state.cards.row);
  const column = useSelector((state: RootState) => state.cards.column);

  const gameState = useSelector(gameStatus);
  const ansCorrect = useSelector(correctness);

  const { data: wordToday } = useGetTodayQuery();

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      if (Reg.test(e.key) && column < 5 && gameState && row < 6) {
        dispatch(inputLetter({ ans: e.key.toLowerCase() }));
      }

      if (e.key === "Backspace" && column > 0 && gameState) {
        dispatch(deleteLetter());
      }

      if (e.key === "Enter" && column === 5 && gameState) {
        dispatch(setColor({ ans: wordToday?.today.toLowerCase() }));
        dispatch(validateGuess());
      }
    }

    window.addEventListener("keydown", keyDownHandler);

    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [cards, column, dispatch, gameState, row, wordToday?.today]);

  const restartGame = () => {
    dispatch(replayGame());
  };

  useEffect(() => {
    if (ansCorrect && !gameState) {
      setTimeout(
        () =>
          Swal.fire({
            icon: "success",
            title: "恭喜答對",
            text: `得到${10 - row + 1}分`,
          }),
        0
      );
    }

    if (!ansCorrect && !gameState) {
      setTimeout(
        () =>
          Swal.fire({
            icon: "warning",
            title: "Oops!",
            text: `遊戲結束`,
          }),
        0
      );
    }
  }, [ansCorrect, gameState, row]);

  return (
    <>
      <Header>Wordle</Header>
      <Wrapper>
        <Plate>
          {cards.map((item, index) => {
            return item.map((unit, j) => {
              return (
                <Card
                  key={index + j}
                  backGround={unit.status}
                  borderColor={unit.letter}
                >
                  {unit.letter}
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
