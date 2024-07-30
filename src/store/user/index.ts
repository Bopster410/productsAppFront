import {
    AsyncThunk,
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { AsyncThunkConfig, RootState } from '../../store';
import { logInUserRequest } from '../../api/user';

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

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: null,
        tokens: null,
        isLogged: false,
    } as State,
    reducers: {
        logInUser: (
            state,
            action: PayloadAction<{ userInfo: UserInfo; tokens: Tokens }>
        ) => {
            const { userInfo, tokens } = action.payload;

            state.isLogged = true;
            state.userInfo = userInfo;
            state.tokens = tokens;
        },

        setAccessToken: (state, action: PayloadAction<string>) => {
            if (state.tokens === null || !state.isLogged) return;

            state.tokens.accessToken = action.payload;
        },

        setUserEmail: (state, action: PayloadAction<string>) => {
            if (state.userInfo === null || !state.isLogged) return;

            state.userInfo.email = action.payload;
        },

        logOutUser: (state) => {
            state.isLogged = false;
            state.tokens = null;
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logInUserThunk.fulfilled, (state, { payload }) => {
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
        });
    },
});

export const { setAccessToken, setUserEmail, logOutUser } =
    userInfoSlice.actions;

export const isUserLogged = (state: RootState) => {
    return (state.userInfo as State).isLogged;
};

export const selectUserInfo = (state: RootState) => {
    return (state.userInfo as State).userInfo;
};
