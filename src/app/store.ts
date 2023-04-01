import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cardReducer from "../features/game/cardSlice";
import keyBoardReducer from "../features/game/keyboardSlice";
import wordleApi from "../features/game/apiSlice";
import themeReducer from "../features/theme/themeSlice";

const rootReducer = combineReducers({
  cards: cardReducer,
  keys: keyBoardReducer,
  theme: themeReducer,
  [wordleApi.reducerPath]: wordleApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['theme'] // 需要缓存的白名单,不设置则全部缓存
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wordleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
