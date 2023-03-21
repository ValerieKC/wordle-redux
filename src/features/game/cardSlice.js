import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const cards = Array.from({ length: 6 }, () => [
  { letter: "", status: "" },
  { letter: "", status: "" },
  { letter: "", status: "" },
  { letter: "", status: "" },
  { letter: "", status: "" },
]);

const initialState = {
  cards: cards,
  row: 0,
  column: 0,
  gameStatus: true,
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    inputLetter(state, action) {
      const { ans } = action.payload;
      state.cards[state.row][state.column].letter = ans;
      state.column += 1;
    },
    validateGuess(state, action) {
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

      const check = state.cards[state.row].every(
        (item) => item.status === "#538d4e"
      );

      if (check) {
        alert(`恭喜答對!得到${10 - state.row}分`);
        state.gameStatus = false;
      }
      state.row += 1;
      state.column = 0;


      if (state.row === 6) {
        state.gameStatus = false;
        alert(`遊戲結束`);
      }
    },
    deleteLetter(state, action) {
      state.cards[state.row][state.column - 1].letter = "";
      state.column -= 1;
    },
    gameOver(state, action) {
      state.gameStatus = false;
    },
    replayGame(state, action) {
      return initialState;
    },
  },
});

export const {
  validateGuess,
  inputLetter,
  deleteLetter,
  increaseLocation,
  refreshColumn,
  replayGame,
} = cardSlice.actions;

export const gameStatus = (state) => state.cards.gameStatus;

export default cardSlice.reducer;
