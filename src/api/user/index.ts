import { ajaxPost } from '../../utils/api';
import { LoginUserResponse } from './types';
import { USER_URLS } from './urls';

export function createUserRequest(email: string, password: string) {
    return ajaxPost(USER_URLS.CREATE_USER, { email, password });
}

export function logInUserRequest(email: string, password: string) {
    return ajaxPost<LoginUserResponse>(USER_URLS.LOG_IN_USER, {
        email,
        password,
    });
}
