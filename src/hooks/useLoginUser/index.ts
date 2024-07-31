import {
    isUserLogged,
    logInUserThunk,
    logOutUserThunk,
    selectUserInfo,
} from '../../store/user';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';

export function useLoginUser() {
    const isLogged = useSelector((state: RootState) => isUserLogged(state));
    const userInfo = useSelector((state: RootState) => selectUserInfo(state));

    const dispatch = useAppDispatch();

    const logIn = (email?: string, password?: string) =>
        dispatch(logInUserThunk({ email, password }));

    const logOut = () => dispatch(logOutUserThunk());

    // const signUp = (email: string, password: string)

    return {
        isLogged,
        userInfo,
        logIn,
        logOut,
    };
}
