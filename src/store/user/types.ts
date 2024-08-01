import { CartResponse } from '../../api/user';
import { Indexed } from '../../store';

type UserInfo = {
    email: string;
};

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

type Cart = Indexed<number>;

export type State = {
    userInfo: UserInfo | null;
    tokens: Tokens | null;
    cart: Cart;
    isLogged: boolean;
};

export type LogInUserThunkReturn =
    | {
          accessToken?: string | undefined;
          refreshToken?: string | undefined;
          email: string;
          cart?: CartResponse;
      }
    | undefined;

export type LogInUserThunkArg = { email?: string; password?: string };
