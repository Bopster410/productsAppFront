import { useLoginUser } from '../../hooks/useLoginUser';
import { UserIcon } from './component';

export const UserIconContainer = () => {
    const { isLogged, userInfo, logIn, logOut } = useLoginUser();

    return (
        <UserIcon
            isLogged={isLogged}
            onLogInSubmit={logIn}
            onLogOut={logOut}
            userInfo={{ email: userInfo?.email }}
        />
    );
};
