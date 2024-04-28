import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { isString, values } from 'lodash';

const BASE_URL = 'http://195.133.79.233';

type ApiTagStructure = {
  [K in string]: string | ApiTagStructure;
};

export const ApiTag = {
  Services: {
    Services: 'Services',
    Categories: 'Categories',
    CategoriesWithServices: 'CategoriesWithServices',
  },
  User: {
    CurrentUser: 'CurrentUser',
  },
} as const;

const getTags = (value: ApiTagStructure): string[] => values(value).flatMap(item => (isString(item) ? item : getTags(item)));

const tagTypes = getTags(ApiTag);

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
  tagTypes,
  endpoints: () => ({}),
});
