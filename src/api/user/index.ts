import { AxiosInstance } from 'axios';
import { ajaxPost } from '@/utils/api';
import { USER_URLS } from './urls';
import { ajaxCustomAxios } from '@/utils/api/ajax';
import { Methods } from '@/utils/api/ajax/index.constants';
import { CartResponse, ChangeCartResponse } from './types';

export function createUserRequest(email: string, password: string) {
    return ajaxPost(USER_URLS.CREATE_USER, { email, password });
}

export function addProductToCartRequest(
    axiosInstance: AxiosInstance,
    productId: string
) {
    return ajaxCustomAxios<ChangeCartResponse>(
        axiosInstance,
        Methods.POST,
        USER_URLS.ADD_TO_CART,
        undefined,
        { productId }
    );
}

export function removeProductFromCartRequest(
    axiosInstance: AxiosInstance,
    productId: string
) {
    return ajaxCustomAxios<ChangeCartResponse>(
        axiosInstance,
        Methods.POST,
        USER_URLS.REMOVE_FROM_CART,
        undefined,
        { productId }
    );
}

export function getUserCart(axiosInstance: AxiosInstance) {
    return ajaxCustomAxios<CartResponse>(
        axiosInstance,
        Methods.GET,
        USER_URLS.GET_USER_CART
    );
}

export type { CartResponse, CartProductIdsResponse } from './types';
