import { createSlice } from '@reduxjs/toolkit';
import { AuthApi } from '../../../modules/Auth/AuthApi.ts';
import { RootState } from '../../../app/store.ts';

interface InitialState {
  user: unknown | null;
  isAuthenticated: boolean;
  token?: string;
}

const token = localStorage.getItem('token');

const initialState: InitialState = {
  user: null,
  isAuthenticated: !!token,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(AuthApi.endpoints.login.matchFulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
  },
});

export const { logout, resetUser } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const selectUser = (state: RootState) => state.auth.user;
