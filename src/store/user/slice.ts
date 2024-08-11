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
        authRequestStatus: null,
        cartRequest: null,
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
            .addCase(logInUserThunk.pending, (state) => {
                state.authRequestStatus = 'pending';
            })
            .addCase(logInUserThunk.rejected, (state) => {
                state.authRequestStatus = 'rejected';
            })
            .addCase(logInUserThunk.fulfilled, (state, { payload }) => {
                state.authRequestStatus = 'fulfilled';

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
            .addCase(logOutUserThunk.pending, (state) => {
                state.authRequestStatus = 'pending';
            })
            .addCase(logOutUserThunk.rejected, (state) => {
                state.authRequestStatus = 'rejected';
            })
            .addCase(logOutUserThunk.fulfilled, (state) => {
                state.authRequestStatus = 'fulfilled';
                state.isLogged = false;
                state.tokens = null;
                state.userInfo = null;
                state.cart = {};
            })
            .addCase(addProductToCartThunk.pending, (state, { meta }) => {
                const { productId } = meta.arg;
                state.cartRequest = { productId, status: 'pending' };
            })
            .addCase(addProductToCartThunk.rejected, (state, { meta }) => {
                const { productId } = meta.arg;
                state.cartRequest = { productId, status: 'rejected' };
            })
            .addCase(addProductToCartThunk.fulfilled, (state, { payload }) => {
                if (!payload) return;
                state.cartRequest = {
                    productId: payload.productId,
                    status: 'fulfilled',
                };
                state.cart[payload.productId] = payload.total;
            })
            .addCase(removeProductFromCartThunk.pending, (state, { meta }) => {
                const { productId } = meta.arg;
                state.cartRequest = { productId, status: 'pending' };
            })
            .addCase(removeProductFromCartThunk.rejected, (state, { meta }) => {
                const { productId } = meta.arg;
                state.cartRequest = { productId, status: 'rejected' };
            })
            .addCase(
                removeProductFromCartThunk.fulfilled,
                (state, { payload }) => {
                    if (!payload) return;
                    state.cartRequest = {
                        productId: payload.productId,
                        status: 'fulfilled',
                    };
                    state.cart[payload.productId] = payload.total;
                }
            );
    },
});
