import { useDispatch, useSelector } from 'react-redux';
import { selectTokens, setAccessToken } from '../../store/user';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { axoisPrivate } from '../../utils/api/ajax';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshAccessTokenRequest } from '../../api/auth';

interface CustomConfig extends InternalAxiosRequestConfig {
    sent: boolean;
}

export function usePrivateRequest() {
    const tokens = useSelector((state: RootState) => selectTokens(state));
    const dispatch = useDispatch();

    useEffect(() => {
        const requestIntercept = axoisPrivate.interceptors.request.use(
            (config) => {
                // Set Atuhorization header if it's not set
                if (config.headers['Authorization'] === undefined)
                    config.headers.set(
                        'Authorization',
                        `Bearer ${tokens?.accessToken}`
                    );
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axoisPrivate.interceptors.response.use(
            (response) => response,
            // Try updating access token and performing request once again
            async (error: AxiosError) => {
                const prevRequest = error?.config as CustomConfig;
                if (
                    error?.response?.status === 403 &&
                    !prevRequest?.sent &&
                    tokens?.refreshToken
                ) {
                    prevRequest.sent = true;
                    const newAccessToken = (
                        await refreshAccessTokenRequest(tokens.refreshToken)
                    ).data?.accessToken;
                    if (newAccessToken) {
                        dispatch(setAccessToken(newAccessToken));
                        prevRequest.headers.set(
                            'Authorization',
                            `Bearer ${newAccessToken}`
                        );
                        return axoisPrivate(prevRequest);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axoisPrivate.interceptors.request.eject(requestIntercept);
            axoisPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [tokens]);

    return axoisPrivate;
}
