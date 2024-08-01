import { createAsyncThunk } from '@reduxjs/toolkit';
import { LogInUserThunkArg, LogInUserThunkReturn } from './types';
import { logInUserRequest, logOutUserRequest } from '../../api/auth';
import { RootState } from '../../store';
import { AxiosInstance } from 'axios';
import {
    addProductToCartRequest,
    removeProductFromCartRequest,
} from '../../api/user';

export const logInUserThunk = createAsyncThunk<
    LogInUserThunkReturn,
    LogInUserThunkArg
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
    void,
    void,
    { state: RootState }
>(
    'userInfo/logOutUserThunk',
    async (_, { getState, fulfillWithValue, rejectWithValue }) => {
        const { isLogged } = getState().userInfo;
        if (!isLogged) {
            rejectWithValue('user is not logged in');
            return;
        }

        const { status } = await logOutUserRequest();
        if (status === 204) fulfillWithValue('success');
        if (status !== 204) rejectWithValue('something went wrong');
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
        const { isLogged } = getState().userInfo;
        if (!isLogged) {
            rejectWithValue('user is not logged in');
            return;
        }

        const { status, data } = await addProductToCartRequest(
            axiosInstance,
            productId
        );
        if (status === 200 && data) {
            fulfillWithValue('success');
            return { productId, total: data.total };
        }
        if (status !== 200) rejectWithValue('something went wrong');
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
        const { isLogged } = getState().userInfo;
        if (!isLogged) {
            rejectWithValue('user is not logged in');
            return;
        }

        const { status, data } = await removeProductFromCartRequest(
            axiosInstance,
            productId
        );
        if (status === 200 && data) {
            fulfillWithValue('success');
            return { productId, total: data.total };
        }
        if (status !== 200) rejectWithValue('something went wrong');
    }
);
