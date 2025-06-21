"use client";
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/FavoritesSlice'
import authReducer from './slices/AuthReducer'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
