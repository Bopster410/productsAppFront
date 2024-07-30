import { useLoginUser } from '../../hooks/useLoginUser';
import { UserIcon } from './component';

export const UserIconContainer = () => {
    const { isLogged, userInfo, logIn } = useLoginUser();

    return (
        <UserIcon
            isLogged={isLogged}
            onLogInSubmit={logIn}
        />
    );
};
