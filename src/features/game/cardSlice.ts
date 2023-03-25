import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface CardsType {
  cards: { letter: string; status: string }[][],
  row:number,
  column:number,
  gameStatus:boolean,
  correctness:boolean
}

const cards:CardsType["cards"] = Array.from({ length: 6 }, () => [
  { letter: "", status: "" },
  { letter: "", status: "" },
  { letter: "", status: "" },
  { letter: "", status: "" },
  { letter: "", status: "" },
]);

const initialState:CardsType = {
  cards: cards,
  row: 0,
  column: 0,
  gameStatus: true,
  correctness:false
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    inputLetter(state, action:PayloadAction<{ans:string}>) {
      const { ans } = action.payload;
      state.cards[state.row][state.column].letter = ans;
      state.column += 1;
    },
    setColor(state, action) {
      const { ans } = action.payload;
      state.cards[state.row].forEach((item, index) => {
        if (item.letter === ans[index]) {
          item.status = "#538d4e";
        } else if (ans.includes(item.letter)) {
          item.status = "#b59f3b";
        } else {
          item.status = "#3a3a3c";
        }
      });
    },
    validateGuess(state) {
      const check = state.cards[state.row].every(
        (item) => item.status === "#538d4e"
      );

      if (check) {
        state.gameStatus = false;
        state.correctness=true
      }
      state.row += 1;
      state.column = 0;

      if (state.row === 6) {
        state.gameStatus = false;
      }
    },
    deleteLetter(state) {
      state.cards[state.row][state.column - 1].letter = "";
      state.column -= 1;
    },
      
    replayGame() {
      return initialState;
    },
  },
});

export const {
  setColor,
  inputLetter,
  deleteLetter,
  replayGame,
  validateGuess,
} = cardSlice.actions;

export const gameStatus = (state:RootState) => state.cards.gameStatus;
export const correctness=(state:RootState)=>state.cards.correctness

export default cardSlice.reducer;
