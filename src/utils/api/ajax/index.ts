import { QueryParam, DataResponce } from './index.types';
import { BACKEND_URL } from '../config/index.constants';
import axios, { AxiosHeaders } from 'axios';
import { ALLOWED_PICTURE_TYPES, Methods } from './index.constants';

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
) {
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
            return response.data;
        })
        .catch((error: T) => {
            return error;
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
    body: object,
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
