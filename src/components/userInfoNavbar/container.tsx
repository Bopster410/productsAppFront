import { useLoginUser } from '../../hooks/useLoginUser';
import { LogInFormDataProvider } from '../../providers/loginForm/component';
import { UserInfoNavbar } from './component';

export const UserInfoNavbarContainer = () => {
    const { isLogged, userInfo, logIn, logOut, requestStatus } = useLoginUser();

    return (
        <LogInFormDataProvider>
            <UserInfoNavbar
                isLoading={requestStatus === 'pending'}
                isLogged={isLogged}
                onLogInSubmit={logIn}
                onLogOut={logOut}
                userInfo={{ email: userInfo?.email }}
            />
        </LogInFormDataProvider>
    );
};
