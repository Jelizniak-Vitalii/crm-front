import { createListenerMiddleware } from '@reduxjs/toolkit';
import { AuthApi } from '../modules/Auth/AuthApi.ts';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: AuthApi.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem('token', action.payload.token);
    }
  },
});
