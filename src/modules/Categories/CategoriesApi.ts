import { api, ApiTag } from '../../app/services/api.ts';
import { Service } from '../Services/ServicesApi.ts';

export type CategoryWithService = {
  updatedAt: string;
  createdAt: string;
  id: number;
  categoryName: string;
  companyId: number;
  services: Service[];
};

export type Category = {
  updatedAt: string;
  createdAt: string;
  id: number;
  categoryName: string;
  companyId: number;
};

export const CategoriesApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllCategories: builder.query<Category[], void>({ query: () => '/categories/categories' }),
    getAllCategoriesWithServices: builder.query<CategoryWithService[], void>({ query: () => '/categories/categories-services', providesTags: [ApiTag.Services.CategoriesWithServices] }),
  }),
});

export const { useGetAllCategoriesWithServicesQuery, useGetAllCategoriesQuery } = CategoriesApi;
