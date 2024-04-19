import { createApi, fetchBaseQuery, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const BASE_URL = 'http://195.133.79.233';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token || localStorage.getItem('token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
  onError: (error: FetchBaseQueryError) => {
    if (error.status === 401) {
      // Перенаправляем пользователя на страницу логина
      window.location.href = '/login';
    }
  },
});
