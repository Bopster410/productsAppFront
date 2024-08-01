import { CartResponse } from '../user/types';

export type LoginUserResponse = {
    accessToken: string;
    refreshToken: string;
    cart: CartResponse;
};

export type RefreshAccessTokenResponse = {
    accessToken: string;
};
