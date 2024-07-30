import { FunctionComponent, useState } from 'react';
import { LogInFormProps } from './types';
import { Button } from '../uikit/button/component';

export const LogInForm: FunctionComponent<LogInFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit(email, password);
            }}
        >
            <input
                onChange={(event) => setEmail(event.target.value)}
                name='email'
                value={email}
            />
            <input
                onChange={(event) => setPassword(event.target.value)}
                name='password'
                value={password}
            />
            <Button
                type='submit'
                color='primary'
            />
        </form>
    );
};
