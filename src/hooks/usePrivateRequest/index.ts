import { useDispatch, useSelector } from 'react-redux';
import { selectTokens, setAccessToken } from '@/store/user';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { addPrivateInterceptors, axoisPrivate } from '@/utils/api/ajax';

export function usePrivateRequest() {
    const tokens = useSelector((state: RootState) => selectTokens(state));
    const dispatch = useDispatch();

    useEffect(() => {
        if (!tokens) return;

        const { clearAxios } = addPrivateInterceptors(
            axoisPrivate,
            tokens?.accessToken,
            tokens?.refreshToken,
            (token) => dispatch(setAccessToken(token))
        );
        return clearAxios;
    }, [tokens]);

    return axoisPrivate;
}
