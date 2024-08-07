import { useLoginUser } from '../../hooks/useLoginUser';
import { LogInFormDataProvider } from '../../providers/loginForm/component';
import { UserInfoNavbar } from './component';

export const UserInfoNavbarContainer = () => {
    const { isLogged, userInfo, logIn, logOut } = useLoginUser();

    return (
        <LogInFormDataProvider>
            <UserInfoNavbar
                isLogged={isLogged}
                onLogInSubmit={logIn}
                onLogOut={logOut}
                userInfo={{ email: userInfo?.email }}
            />
        </LogInFormDataProvider>
    );
};
