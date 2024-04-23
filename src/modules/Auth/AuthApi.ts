import { api } from '../../app/services/api.ts';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegistrationPayload = {
  email: string;
  city: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export type RegistrationResponse = {
  token: string;
};

export const AuthApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<RegistrationResponse, RegistrationPayload>({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = AuthApi;

export const {
  endpoints: { login, register },
} = AuthApi;
