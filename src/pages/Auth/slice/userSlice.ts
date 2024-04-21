import { createSlice } from '@reduxjs/toolkit';
import { AuthApi } from '../../../modules/Auth/AuthApi.ts';
import { RootState } from '../../../app/store.ts';
import { UserApi } from '../../../modules/User/UserApi.ts';
import { User } from '../../../modules/User/types/user.ts';

interface InitialState {
  isAuthenticated: boolean;
  token?: string;
  currentUser?: User;
}

const token = localStorage.getItem('token');

const initialState: InitialState = {
  isAuthenticated: Boolean(token),
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(AuthApi.endpoints.login.matchFulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addMatcher(AuthApi.endpoints.login.matchRejected, state => {
      state.token = undefined;
      state.isAuthenticated = false;
    });
    builder.addMatcher(UserApi.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addMatcher(UserApi.endpoints.getCurrentUser.matchRejected, state => {
      state.token = undefined;
      state.isAuthenticated = false;
    });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
