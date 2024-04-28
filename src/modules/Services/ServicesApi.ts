import { api, ApiTag } from '../../app/services/api.ts';

export type CreateServicePayload = {
  serviceName: string;
  categoryId?: number;
  categoryName?: string;
  price?: string;
  duration?: string;
  description?: string;
  image?: string;
  active?: boolean;
  onlineBooking?: string;
  userIds?: string[];
};

export type CreateServiceResponse = unknown;

export type Service = {
  updatedAt: string;
  createdAt: string;
  id: number;
  serviceName: string;
  categoryId: number;
  categoryName: string;
  price: string;
  duration: string;
  description: string;
  onlineBooking: string;
  image: string;
  active: boolean;
};

export const ServicesApi = api.injectEndpoints({
  endpoints: builder => ({
    createService: builder.mutation<CreateServiceResponse, CreateServicePayload>({
      query: body => ({
        url: '/services/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [ApiTag.Services.CategoriesWithServices],
    }),
    getAllServices: builder.query<Service[], void>({ query: () => '/services/services' }),
  }),
});

export const { useCreateServiceMutation, useGetAllServicesQuery } = ServicesApi;
