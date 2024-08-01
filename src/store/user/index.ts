import { userInfoSlice } from './slice';

export const { setAccessToken } = userInfoSlice.actions;

export {
    isUserLogged,
    selectTokens,
    selectUserInfo,
    selectCartItemById,
} from './selectors';

export { userInfoSlice };

export { logInUserThunk, logOutUserThunk } from './thunks';
