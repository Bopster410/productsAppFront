import { createAsyncThunk } from '@reduxjs/toolkit';
import { LogInUserThunkArg, LogInUserThunkReturn } from './types';
import { logInUserRequest, logOutUserRequest } from '../../api/auth';
import { RootState } from '@/store';
import { AxiosInstance } from 'axios';
import {
    addProductToCartRequest,
    removeProductFromCartRequest,
} from '../../api/user';

export const logInUserThunk = createAsyncThunk<
    LogInUserThunkReturn,
    LogInUserThunkArg,
    { state: RootState }
>(
    'userInfo/logInUserThunk',
    async ({ email, password }: { email?: string; password?: string }, _) => {
        if (!email || !password) return;

        const response = await logInUserRequest(email, password);
        if (response.status !== 200) return;
        return { email: email, ...response.data };
    }
);

export const logOutUserThunk = createAsyncThunk<
    string,
    void,
    { state: RootState }
>(
    'userInfo/logOutUserThunk',
    async (_, { getState, fulfillWithValue, rejectWithValue }) => {
        const { isLogged } = getState().userInfo;
        if (!isLogged) return rejectWithValue('user is not logged in');

        const { status } = await logOutUserRequest();
        if (status === 204) return fulfillWithValue('success');

        return rejectWithValue('something went wrong');
    }
);

export const addProductToCartThunk = createAsyncThunk<
    { productId: string; total: number } | undefined,
    { axiosInstance: AxiosInstance; productId: string },
    { state: RootState }
>(
    'userInfo/addProductToCartThunk',
    async (
        { axiosInstance, productId },
        { getState, fulfillWithValue, rejectWithValue }
    ) => {
        const { isLogged, cartRequest } = getState().userInfo;
        if (
            (cartRequest?.status == 'pending' &&
                cartRequest.productId != productId) ||
            !isLogged
        ) {
            console.log('reject');
            return rejectWithValue(productId);
        }

        const { status, data } = await addProductToCartRequest(
            axiosInstance,
            productId
        );

        if (status === 200 && data) {
            console.log(status, data);
            return fulfillWithValue({ productId, total: data.total });
        }

        return rejectWithValue(productId);
    }
);
export const removeProductFromCartThunk = createAsyncThunk<
    { productId: string; total: number } | undefined,
    { axiosInstance: AxiosInstance; productId: string },
    { state: RootState }
>(
    'userInfo/removeProductFromCartThunk',
    async (
        { axiosInstance, productId },
        { getState, fulfillWithValue, rejectWithValue }
    ) => {
        const { isLogged, cartRequest } = getState().userInfo;
        if (
            (cartRequest?.status === 'pending' &&
                cartRequest.productId !== productId) ||
            !isLogged
        )
            return rejectWithValue(productId);

        const { status, data } = await removeProductFromCartRequest(
            axiosInstance,
            productId
        );

        if (status === 200 && data) {
            console.log(status, data);
            return fulfillWithValue({ productId, total: data.total });
        }

        return rejectWithValue(productId);
    }
);
