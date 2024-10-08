import { QueryParam, DataResponce } from './index.types';
import { BACKEND_URL } from '../config/index.constants';
import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from 'axios';
import { ALLOWED_PICTURE_TYPES, Methods } from './index.constants';
import { refreshAccessTokenRequest } from '@/api/auth';

export const axiosPublic = axios.create({
    baseURL: BACKEND_URL,
});

export const axoisPrivate = axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Content-Type': 'application/json; charset=utf8' },
    withCredentials: true,
});

export async function ajaxCustomAxios<T>(
    axiosCustom: AxiosInstance,
    method: Methods,
    url: string,
    queryParams?: QueryParam,
    body?: object
): Promise<DataResponce<T>> {
    const config = {
        method,
        params: queryParams,
        data: body == null ? null : JSON.stringify(body),
    };

    return axiosCustom(url, config)
        .then((response) => {
            return { status: response.status ?? 500, data: response.data as T };
        })
        .catch((error: AxiosError) => {
            return { status: error.status ?? 500, msg: error.message };
        });
}

/**
 * Performs ajax request
 * @param {string} method - HTTP method
 * @param {string} url - url for request
 * @param {Map<string, string>} queryParams - query GET params for requesst
 * @param {object} body - body for POST request
 * @param {CallbackFunction} callback - callback function
 * @returns promise
 */
export async function ajax<T>(
    method: Methods,
    url: string,
    queryParams?: QueryParam,
    body?: object
): Promise<DataResponce<T>> {
    let fullUrl = BACKEND_URL + url;

    const headers = new AxiosHeaders();
    if (body) {
        headers.set('Content-Type', 'application/json; charset=utf8');
    }

    const config = {
        method,
        headers,
        withCredentials: true,
        params: queryParams,
        data: body == null ? null : JSON.stringify(body),
    };

    return axios(fullUrl, config)
        .then((response) => {
            return { status: response.status ?? 500, data: response.data as T };
        })
        .catch((error: AxiosError) => {
            return { status: error.status ?? 500, msg: error.message };
        });
}

/**
 * Performs GET request
 * @param url - url for request
 * @param queryParams - query GET params for requesst
 * @returns promise
 */
export async function ajaxGet<T>(url: string, queryParams?: QueryParam) {
    return ajax<T>(Methods.GET, url, queryParams);
}

/**
 * Performs POST request
 * @param url - url for request
 * @param queryParams - query GET params for requesst
 * @param body - body for POST request
 * @returns promise
 */
export async function ajaxPost<T>(
    url: string,
    body?: object,
    queryParams?: QueryParam
) {
    return ajax<T>(Methods.POST, url, queryParams, body);
}

/**
 * Performs ajax request sending form data
 * @param {string} method - HTTP method
 * @param {string} url - url for request
 * @param {HTMLFormElement} form - html form to send
 * @param {CallbackFunction} callback - callback function
 * @returns promise
 */
export async function ajaxMultipartForm<T>(
    method: string,
    url: string,
    formData: FormData
) {
    return fetch(BACKEND_URL + url, {
        method,
        credentials: 'include',
        body: formData,
    })
        .then((response) => {
            return response.json();
        })
        .then((data: DataResponce<T>) => {
            return data;
        })
        .catch((error: DataResponce<T>) => {
            return error;
        });
}

export async function fetchPicture(url: string) {
    return fetch(BACKEND_URL + url, {
        method: 'GET',
        credentials: 'include',
    })
        .then(async (response) => {
            if (
                ALLOWED_PICTURE_TYPES.includes(
                    response.headers.get('content-type') ?? 'jpeg'
                )
            ) {
                const data = await response.blob();
                return { status: 200, data: data };
            }
            return response.json();
        })
        .then((data: DataResponce<Blob>) => {
            return data;
        });
}

interface CustomConfig extends InternalAxiosRequestConfig {
    sent: boolean;
}

export function addPrivateInterceptors(
    axiosInstance: AxiosInstance,
    accessToken: string,
    refreshToken: string,
    onTokenRefresh: (token: string) => void
) {
    const requestIntercept = axiosInstance.interceptors.request.use(
        (config) => {
            // Set Atuhorization header if it's not set
            if (config.headers['Authorization'] === undefined)
                config.headers.set('Authorization', `Bearer ${accessToken}`);
            return config;
        },
        (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
        (response) => response,
        // Try updating access token and performing request once again
        async (error: AxiosError) => {
            const prevRequest = error?.config as CustomConfig;
            if (
                error?.response?.status === 403 &&
                !prevRequest?.sent &&
                refreshToken
            ) {
                prevRequest.sent = true;
                const newAccessToken = (
                    await refreshAccessTokenRequest(refreshToken)
                ).data?.accessToken;
                if (newAccessToken) {
                    onTokenRefresh(newAccessToken);
                    prevRequest.headers.set(
                        'Authorization',
                        `Bearer ${newAccessToken}`
                    );
                    return axiosInstance(prevRequest);
                }
            }
            return Promise.reject(error);
        }
    );

    return {
        clearAxios: () => {
            axiosInstance.interceptors.request.eject(requestIntercept);
            axiosInstance.interceptors.response.eject(responseIntercept);
        },
    };
}
