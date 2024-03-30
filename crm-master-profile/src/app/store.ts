import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import auth from '../pages/Auth/slice/userSlice.ts';
import { listenerMiddleware } from '../middleware/auth';
import { api } from './services/api.ts';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
