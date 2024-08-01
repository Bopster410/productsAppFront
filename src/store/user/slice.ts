import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from './types';
import {
    addProductToCartThunk,
    logInUserThunk,
    logOutUserThunk,
    removeProductFromCartThunk,
} from './thunks';

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: null,
        tokens: null,
        isLogged: false,
        cart: {},
    } as State,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            if (state.tokens === null || !state.isLogged) return;

            state.tokens.accessToken = action.payload;
        },

        setUserEmail: (state, action: PayloadAction<string>) => {
            if (state.userInfo === null || !state.isLogged) return;

            state.userInfo.email = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logInUserThunk.fulfilled, (state, { payload }) => {
                if (
                    payload === undefined ||
                    payload.accessToken === undefined ||
                    payload.refreshToken === undefined ||
                    payload.cart === undefined
                )
                    return;

                state.isLogged = true;
                state.userInfo = { email: payload.email };
                state.tokens = {
                    accessToken: payload.accessToken,
                    refreshToken: payload.refreshToken,
                };
                state.cart = {};
                payload.cart.forEach(
                    ({ productId, total }) => (state.cart[productId] = total)
                );
            })
            .addCase(logOutUserThunk.fulfilled, (state) => {
                state.isLogged = false;
                state.tokens = null;
                state.userInfo = null;
                state.cart = {};
            })
            .addCase(addProductToCartThunk.fulfilled, (state, { payload }) => {
                if (!payload) return;
                state.cart[payload.productId] = payload.total;
            })
            .addCase(
                removeProductFromCartThunk.fulfilled,
                (state, { payload }) => {
                    if (!payload) return;
                    state.cart[payload.productId] = payload.total;
                }
            );
    },
});
