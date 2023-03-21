import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../features/game/cardSlice';

export const store = configureStore({
  reducer: {
    cards: cardReducer,
  },
});
