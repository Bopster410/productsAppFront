import {
    AsyncThunk,
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { AsyncThunkConfig, RootState } from '../../store';
import { logInUserRequest, logOutUserRequest } from '../../api/user';

type UserInfo = {
    email: string;
};

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

type State = {
    userInfo: UserInfo | null;
    tokens: Tokens | null;
    isLogged: boolean;
};

type LogInUserThunkReturn =
    | {
          accessToken?: string | undefined;
          refreshToken?: string | undefined;
          email: string;
      }
    | undefined;

type LogInUserThunkArg = { email?: string; password?: string };

export const logInUserThunk: AsyncThunk<
    LogInUserThunkReturn,
    LogInUserThunkArg,
    AsyncThunkConfig
> = createAsyncThunk<LogInUserThunkReturn, LogInUserThunkArg>(
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

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: null,
        tokens: null,
        isLogged: false,
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
                    payload.refreshToken === undefined
                )
                    return;
                state.isLogged = true;
                state.userInfo = { email: payload.email };
                state.tokens = {
                    accessToken: payload.accessToken,
                    refreshToken: payload.refreshToken,
                };
            })
            .addCase(logOutUserThunk.fulfilled, (state) => {
                state.isLogged = false;
                state.tokens = null;
                state.userInfo = null;
            });
    },
});

export const isUserLogged = (state: RootState) => {
    return (state.userInfo as State).isLogged;
};

export const selectUserInfo = (state: RootState) => {
    return (state.userInfo as State).userInfo;
};
