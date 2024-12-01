import styled, { keyframes, css,DefaultTheme } from "styled-components";
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
  setIsPressedTrue
} from "./cardSlice";
import Keyboard from "../../components/Keyboard";
import { setKeyState, clearKeyState } from "./keyboardSlice";
import { toggleTheme } from "../theme/themeSlice";


const Header = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  background-color: ${(props) => props.theme.HEADER_BACKGROUND_COLOR};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: ${(props) => props.theme.HEADER_FONT_COLOR};
  letter-spacing: 5px;
  font-weight: 900;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  height: calc(100vh - 100px);
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
  isPressed?: boolean;
  theme?: DefaultTheme | undefined;
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

const EnlargeCard =keyframes`
   0% {
    transform: scale(1);
  }
  50%{
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const pressedAnimation = () => css`
  animation-name: ${EnlargeCard};
  animation-timing-function: linear;
  animation-iteration-count: ease;
  animation-duration: 0.05s;
`;

const flipCardAnimation = () => css`
  animation-name: ${FlipCard};
  animation-timing-function: linear;
  animation-iteration-count: ease;
  animation-duration: 0.6s;
`;
const Card = styled.div`
  width: calc((100% - 20px) / 5);
  height: calc((100% - 25px) / 6);
  border: 1px solid #3a3a3c;
  color: ${(props) =>
    props.isFlipped
      ? props.theme.CARD_FONT_COLOR_ANSWERED
      : props.theme.CARD_FONT_COLOR_DEFAULT};

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 900;
  text-transform: uppercase;

  background-color: ${(props: Props) =>
    props.backGround ? props.theme && props.theme[props.backGround] : ""};
  border-color: ${(props: Props) =>
    props.borderColor ? props.theme?.CARD_BORDER_COLOR_FOCUS : props.theme?.CARD_BORDER_COLOR_DEFAULT};
  ${(props) => props.borderColor && "border-width:2px;"}
  ${(props) => props.isFlipped && "border:none;"}



  ${(props) => props.isPressed && pressedAnimation};
  ${(props) => props.isFlipped && flipCardAnimation};

  
`;

const Btn = styled.div`
  margin: 20px auto;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.BTN_BORDER_COLOR};
  border-radius: 10px;
  color: ${(props) => props.theme.BTN_FONT_COLOR};
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.BTN_HOVER_BACKGROUND_COLOR};
    color: ${(props) => props.theme.BTN_HOVER_FONT_COLOR};
    font-size: 21px;
    border: none;
  }
`;

const SwitchThemeBtn = styled.div`
  width: 40px;
  height: 40px;
  background-image:url(${props=>props.theme.SWITCH_THEME_BTN});
  background-size:cover;
  position: absolute;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  

`;

const Reg = /^[A-Za-z]$/;

const wordToday = {word: 'apple'};
export function Game() {
  const dispatch = useDispatch();

  const cards = useSelector(cardsState);
  const row = useSelector(rowState);
  const column = useSelector(columnState);
  const gameState = useSelector(gameStatus);
  const ansCorrect = useSelector(correctness);

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      if (Reg.test(e.key) && column < 5 && gameState && row < 6) {
        dispatch(setIsPressedTrue());

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
                  ans: wordToday?.word.toUpperCase(),
                  index: i,
                })
              );
              resolve();
            }, i * 350)
          );
          promise.then(() => {
            if (i + 1 === 5) {
              dispatch(validateGuess());
              const guessLetters = cards[row].map(
                (item: { letter: string }) => item.letter
              );
              dispatch(
                setKeyState({ guessing: guessLetters, ans: wordToday?.word })
              );
            }
          });
        }
      }
    }

    window.addEventListener("keydown", keyDownHandler);

    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [cards, column, dispatch, gameState, row, wordToday?.word]);

  const restartGame = () => {
    dispatch(replayGame());
    dispatch(clearKeyState());
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
      <Header>
        Wordle
        <SwitchThemeBtn onClick={() => dispatch(toggleTheme())}>
        </SwitchThemeBtn>
      </Header>
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
                  isPressed={unit.isPressed}
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
