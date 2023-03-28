import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../features/game/cardSlice';
import keyBoardReducer from "../features/game/keyboardSlice"
import  wordleApi  from '../features/game/apiSlice';

const store = configureStore({
  reducer: {
    cards: cardReducer,
    keys:keyBoardReducer,
    [wordleApi.reducerPath]:wordleApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(wordleApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>

export default store