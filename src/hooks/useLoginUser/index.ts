import {
    isUserLogged,
    logInUserThunk,
    logOutUserThunk,
    selectUserInfo,
} from '../../store/user';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { selectAuthRequestStatus } from '../../store/user/selectors';
import { useCallback } from 'react';

export function useLoginUser() {
    const isLogged = useSelector((state: RootState) => isUserLogged(state));
    const userInfo = useSelector((state: RootState) => selectUserInfo(state));
    const requestStatus = useSelector((state: RootState) =>
        selectAuthRequestStatus(state)
    );

    const dispatch = useAppDispatch();

    const logIn = useCallback(
        (email?: string, password?: string) =>
            dispatch(logInUserThunk({ email, password })),
        [logInUserThunk, dispatch]
    );

    const logOut = useCallback(
        () => dispatch(logOutUserThunk()),
        [logOutUserThunk, dispatch]
    );

    return {
        isLogged,
        userInfo,
        logIn,
        logOut,
        requestStatus,
    };
}
