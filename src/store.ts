import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './components/cart/store';

// Создание стора
export const store = configureStore({
    reducer: { cart: cartSlice.reducer },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type Action<Payload = any> = { payload: Payload; type: string };
export type Indexed<T> = {
    [id: string]: T;
};
