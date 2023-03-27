import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const letter: string[] = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

const keyArray = Array.from(letter, (item) => {
  return { key: `${item.toUpperCase()}`, type: false, status: "" };
});
const keyBoardSlice = createSlice({
  name: "keys",
  initialState: keyArray,
  reducers: {
    setKeyState(state, action) {
      const { guessing, ans } = action.payload;

      const keyInState = state.map((item) => {
        if (guessing.includes(item.key)) {
          return { ...item, type: true };
        } else {
          return item;
        }
      });

      const ansState = keyInState.map((item: any, index: any) => {
        if (item.type === false) return item;

        if (guessing.indexOf(item.key) < 0) return item;

        //wordle的virtual keyboard是只要該字有猜對，鍵盤按鍵就會顯示猜對的顏色(綠)，就算後來猜錯也不會變成猜錯的顏色(所以跟5*6方格顯示不同步是正常的)
        if (item.status === "correct") return item;

        const ansArr = ans.toUpperCase().split("");

        if (guessing.indexOf(item.key) === ansArr.indexOf(item.key)) {
          return { ...item, status: "#538d4e" };
        } else if (ansArr.includes(item.key)) {
          return { ...item, status: "#b59f3b" };
        } else {
          return { ...item, status: "#3a3a3c" };
        }
      });
      return ansState;
    },
    clearKeyState() {
      return keyArray;
    },
  },
});

export const { setKeyState, clearKeyState } = keyBoardSlice.actions;

export default keyBoardSlice.reducer;
