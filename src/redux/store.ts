import { configureStore } from '@reduxjs/toolkit';
import cartRedux from './cartRedux';
import { productsSlice } from './productsRedux';
import { orderSlice } from './orderRedux';

export const store = configureStore({
  reducer: {
    cart: cartRedux,
    [productsSlice.reducerPath]: productsSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsSlice.middleware, orderSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;