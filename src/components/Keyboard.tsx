import styled from "styled-components";
import { useDispatch } from "react-redux";
import { inputLetter } from "../features/game/cardSlice";
import { useSelector } from "react-redux";
import {
  rowState,
  columnState,
  cardsState,
  gameStatus,
  setColor,
  validateGuess,
  deleteLetter,
  setIsPressedTrue,
} from "../features/game/cardSlice";
import { useGetTodayQuery } from "../features/game/apiSlice";
import { setKeyState,firstRowKeys,secondRowKeys,thirdRowKeys } from "../features/game/keyboardSlice";

const Wrapper = styled.div`
  margin: auto auto;
  width: 100%;
  height: fit-content;
`;
const Row = styled.div`
  width: 100%;
  margin: 0 auto 8px;
  display: flex;
  column-gap: 6px;
  touch-action: manipulation;
`;

interface BtnColor {
  isGuessed:boolean;
  backGround:string;
}

const Btn = styled.div`
  width: calc((100% - 54px) / 10);
  height: 58px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background-color: ${(props: BtnColor) =>
    props.isGuessed ? props.backGround : "#818384"};
`;
const Space = styled.div`
  height: 58px;
  width: calc((100% - 54px) / 10 / 2);
`;

const SpecialBtn = styled.div`
  width: calc((100% - 54px) / 10 * 2);
  font-size: 12px;
  height: 58px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background-color: #818384;
`;



export default function Keyboard() {
  const dispatch = useDispatch();
  const cards = useSelector(cardsState);
  const row = useSelector(rowState);
  const column = useSelector(columnState);
  const gameState = useSelector(gameStatus);
  const { data: wordToday } = useGetTodayQuery();

  const firstRow = useSelector(firstRowKeys);
    const secondRow = useSelector(secondRowKeys);
  const thirdRow = useSelector(thirdRowKeys);

  const keyBtnHandler = (word: string) => {
    if (column === 5) return;
    if (column < 5 && gameState && row < 6) {
      dispatch(setIsPressedTrue());
      dispatch(inputLetter({ ans: word.toUpperCase() }));
    }
  };

  const enterHandler = () => {
    if (column === 5 && gameState) {
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
            const guessLetters = cards[row].map((item) => item.letter);
            dispatch(setKeyState({guessing:guessLetters,ans:wordToday?.today.toUpperCase()}))
            
            // console.log(guessLetters);
          }
        });
      }
    }
  };

  const deleteHandler = () => {
    if (column > 0 && gameState) {
      dispatch(deleteLetter());
    }
  };

  return (
    <Wrapper>
      <Row>
        {firstRow.map((item) => (
          <Btn
            key={item.key}
            onClick={() => keyBtnHandler(item.key)}
            backGround={item.status}
            isGuessed={item.type}
          >
            {item.key}
          </Btn>
        ))}
      </Row>
      <Row>
        <Space />
        {secondRow.map((item) => (
          <Btn
            key={item.key}
            onClick={() => keyBtnHandler(item.key)}
            backGround={item.status}
            isGuessed={item.type}
          >
            {item.key}
          </Btn>
        ))}
        <Space />
      </Row>
      <Row>
        <SpecialBtn onClick={enterHandler}>Enter</SpecialBtn>
        {thirdRow.map((item) => (
          <Btn
            key={item.key}
            onClick={() => keyBtnHandler(item.key)}
            backGround={item.status}
            isGuessed={item.type}
          >
            {item.key}
          </Btn>
        ))}
        <SpecialBtn onClick={deleteHandler}>Delete</SpecialBtn>
      </Row>
    </Wrapper>
  );
}
