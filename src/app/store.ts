import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../features/game/cardSlice';
import  wordleApi  from '../features/game/apiSlice';

const store = configureStore({
  reducer: {
    cards: cardReducer,
    [wordleApi.reducerPath]:wordleApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(wordleApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>

export default store