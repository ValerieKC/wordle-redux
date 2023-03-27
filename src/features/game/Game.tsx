import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  rowState,
  columnState,
  cardsState,
  inputLetter,
  setColor,
  deleteLetter,
  gameStatus,
  replayGame,
  validateGuess,
  correctness,
  
} from "./cardSlice";
import { useGetTodayQuery } from "./apiSlice";
import Keyboard from "../../components/Keyboard";
import { setKeyState,clearKeyState } from "./keyboardSlice";

const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: white;
  letter-spacing: 5px;
  font-weight: 900;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  height:calc(100vh - 100px);
  display: flex;
  flex-direction: column;
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
  isFlipped?: boolean;
  delay?: number;
}

const FlipCard = keyframes`
   0% {
    transform: scaleY(1);
  }
  50%{
transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
`;

const Card = styled.div`
  width: calc((100% - 20px) / 5);
  height: calc((100% - 25px) / 6);
  border: 1px solid #3a3a3c;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 900;
  text-transform: uppercase;

  background-color: ${(props: Props) =>
    props.backGround ? props.backGround : ""};
  border-color: ${(props: Props) =>
    props.borderColor ? "#565758" : "#3a3a3c"};
  ${(props) => props.borderColor && "border-width:2px;"}
  ${(props) => props.isFlipped && "border:none;"}
  animation-name: ${(props) => (props.isFlipped ? FlipCard : "")};
  animation-timing-function: linear;
  animation-iteration-count: ease;
  animation-duration: 0.6s;
`;

const Btn = styled.div`
  margin: 20px auto;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
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

  const cards = useSelector(cardsState);
  const row = useSelector(rowState);
  const column = useSelector(columnState);
  const gameState = useSelector(gameStatus);
  const ansCorrect = useSelector(correctness);

  const { data: wordToday } = useGetTodayQuery();

console.log(wordToday?.today.toLowerCase());

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      if (Reg.test(e.key) && column < 5 && gameState && row < 6) {
        dispatch(inputLetter({ ans: e.key.toUpperCase() }));
      }

      if (e.key === "Backspace" && column > 0 && gameState) {
        dispatch(deleteLetter());
      }

      if (e.key === "Enter" && column === 5 && gameState) {
        for (let i = 0; i < 5; i++) {
          let promise = new Promise<void>((resolve) =>
            setTimeout(() => {
              dispatch(
                setColor({
                  ans: wordToday?.today.toUpperCase(),
                  index: i,
                })
              );
              resolve();
            }, i * 350)
          );
          promise.then(() => {
            if (i + 1 === 5) {
              dispatch(validateGuess());
              const guessLetters = cards[row].map((item: { letter: string }) => item.letter);
              dispatch(
                setKeyState({ guessing: guessLetters, ans: wordToday?.today })
              );
            }
          });
        }
      }
    }

    

    window.addEventListener("keydown", keyDownHandler);

    return () => 
      window.removeEventListener("keydown", keyDownHandler);
   
    
  }, [cards, column, dispatch, gameState, row, wordToday?.today]);

  const restartGame = () => {
    dispatch(replayGame());
    dispatch(clearKeyState())
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
        700
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
        700
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
                  isFlipped={unit.isFlipped}
                >
                  {unit.letter}
                </Card>
              );
            });
          })}
        </Plate>
        <Btn onClick={restartGame}>Restart Game</Btn>
        <Keyboard />
      </Wrapper>
    </>
  );
}
