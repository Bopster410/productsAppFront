import { RootState } from '../../store';
import { State } from './types';

export const isUserLogged = (state: RootState) => {
    return (state.userInfo as State).isLogged;
};

export const selectUserInfo = (state: RootState) => {
    return (state.userInfo as State).userInfo;
};

export const selectTokens = (state: RootState) => {
    return (state.userInfo as State).tokens;
};

export const selectCartItemById = (state: RootState, id: string) =>
    (state.userInfo as State).cart[id] ?? 0;
