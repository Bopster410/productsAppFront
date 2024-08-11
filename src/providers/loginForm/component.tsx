import React, { FunctionComponent, PropsWithChildren, useState } from 'react';

type LogInFormData = {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    clearData: () => void;
};

export const LogInFormDataContext = React.createContext<LogInFormData>({
    email: '',
    password: '',
    setEmail: () => {},
    setPassword: () => {},
    clearData: () => {},
});

export const LogInFormDataProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <LogInFormDataContext.Provider
            value={{
                email: email,
                password: password,
                setEmail,
                setPassword,
                clearData: () => {
                    setEmail('');
                    setPassword('');
                },
            }}
        >
            {children}
        </LogInFormDataContext.Provider>
    );
};
