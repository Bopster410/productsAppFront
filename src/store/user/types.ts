import { CartProductIdsResponse } from '../../api/user/types';
import { Indexed } from '../../store';

type UserInfo = {
    email: string;
};

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

type RequestStatus = 'pending' | 'fulfilled' | 'rejected' | null;

type Cart = Indexed<number>;

export type State = {
    authRequestStatus: RequestStatus;
    cartRequest: { productId: string; status: RequestStatus } | null;
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
          cart?: CartProductIdsResponse;
      }
    | undefined;

export type LogInUserThunkArg = { email?: string; password?: string };
