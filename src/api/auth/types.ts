import { CartProductIdsResponse } from '../user/types';

export type LoginUserResponse = {
    accessToken: string;
    refreshToken: string;
    cart: CartProductIdsResponse;
};

export type RefreshAccessTokenResponse = {
    accessToken: string;
};
