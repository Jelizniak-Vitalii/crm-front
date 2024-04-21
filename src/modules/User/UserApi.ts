import { api } from '../../app/services/api.ts';
import { User } from './types/user.ts';

export type UserResponse = User;

export type UpdateUserProfilePayload = Pick<User, 'firstName' | 'lastName' | 'phone' | 'id'>;

export const UserApi = api.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<UserResponse, void>({ query: () => '/users/currentUser' }),
    updateUserProfile: builder.mutation<unknown, UpdateUserProfilePayload>({
      query: body => ({
        url: '/users/update',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateUserProfileMutation } = UserApi;

export const {
  endpoints: { getCurrentUser, updateUserProfile },
} = UserApi;