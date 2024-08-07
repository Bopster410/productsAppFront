import { FunctionComponent } from 'react';
export const WithAuthorization: FunctionComponent<{
    isLogged: boolean;
    authorized: React.ReactNode;
    notAuthorized: React.ReactNode;
}> = ({ isLogged, authorized, notAuthorized }) => {
    return isLogged ? authorized : notAuthorized;
};
