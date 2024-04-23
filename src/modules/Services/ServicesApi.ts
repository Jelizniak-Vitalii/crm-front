import { api } from '../../app/services/api.ts';

export type CreateServicePayload = {
  serviceName: string;
  categoryId: number;
  price?: string;
  duration?: string;
  description?: string;
  image?: string;
  active?: boolean;
};

export type CreateServiceResponse = unknown;

export const ServicesApi = api.injectEndpoints({
  endpoints: builder => ({
    createService: builder.mutation<CreateServiceResponse, CreateServicePayload>({
      query: body => ({
        url: '/services/create',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateServiceMutation } = ServicesApi;
