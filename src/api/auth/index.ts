import { ajaxPost } from '../../utils/api';
import { LoginUserResponse, RefreshAccessTokenResponse } from './types';
import { AUTH_URLS } from './urls';

export function logInUserRequest(email: string, password: string) {
    return ajaxPost<LoginUserResponse>(AUTH_URLS.LOG_IN_USER, {
        email,
        password,
    });
}

export function logOutUserRequest() {
    return ajaxPost(AUTH_URLS.LOG_OUT_USER);
}

export function refreshAccessTokenRequest(refreshToken: string) {
    return ajaxPost<RefreshAccessTokenResponse>(AUTH_URLS.REFRESH_TOKEN, {
        token: refreshToken,
    });
}
