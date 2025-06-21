"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteCity {
  city: string;
  temperature: number;
  condition: string;
  wind: number;
  humidity: number;
}

interface FavoritesState {
  list: FavoriteCity[];
}

const initialState: FavoritesState = {
  list: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteCity>) => {
      if (!state.list.find(city => city.city === action.payload.city)) {
        state.list.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(city => city.city !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
