import { getUserCart } from '@/api/user';
import { store } from '@/store';
import { setAccessToken } from '@/store/user';
import { addPrivateInterceptors, axoisPrivate } from '@/utils/api/ajax';
import { LoaderFunction } from 'react-router-dom';

export const loader: LoaderFunction = async () => {
    const tokens = store.getState().userInfo.tokens;
    if (!tokens) return {};

    const { clearAxios } = addPrivateInterceptors(
        axoisPrivate,
        tokens.accessToken,
        tokens.refreshToken,
        (token) => store.dispatch(setAccessToken(token))
    );

    const response = await getUserCart(axoisPrivate);
    clearAxios();
    return response;
};
