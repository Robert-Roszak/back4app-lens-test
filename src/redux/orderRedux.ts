import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config';
import { OrderModel } from '../types/interfaces';

export const orderSlice = createApi({
  reducerPath: 'orders',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    sendOrder: builder.mutation<{orderId: string}, Partial<OrderModel>>({
      query: (payload) => ({
        url: '/orders',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    fetchOrder: builder.query<OrderModel, string | undefined>({
      query: (id) => `/orders/${id}`,
    }),
  }),
});

export const { useSendOrderMutation, useFetchOrderQuery } = orderSlice;