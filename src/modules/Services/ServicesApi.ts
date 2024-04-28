import { api } from '../../app/services/api.ts';

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
  newImage?: string;
  userIds?: string[];
};

export type CreateServiceResponse = unknown;

type Service = {
  updatedAt: string;
  createdAt: string;
  id: number;
  serviceName: string;
  categoryId: number;
  categoryName: string;
  price: string;
  duration: string;
  description: string;
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
    }),
    getAllServices: builder.query<Service[], void>({ query: () => '/services/services' }),
    getAllCategoriesWithServices: builder.query<any, void>({ query: () => '/categories/categories' }),
  }),
});

export const { useCreateServiceMutation, useGetAllServicesQuery, useGetAllCategoriesWithServicesQuery } = ServicesApi;
