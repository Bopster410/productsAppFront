import { FunctionComponent, useState } from 'react';
import { LogInFormProps } from './types';
import { Button } from '../uikit/button/component';
import { Input } from '../uikit/input/conponent';
import styles from './style.module.scss';

export const LogInForm: FunctionComponent<LogInFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form
            className={styles['login-form']}
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit(email, password);
            }}
        >
            <Input
                onChange={(event) => setEmail(event.target.value)}
                name='email'
                placeholder='ваша почта'
                value={email}
            />
            <Input
                onChange={(event) => setPassword(event.target.value)}
                name='password'
                placeholder='пароль'
                value={password}
            />
            <Button
                type='submit'
                color='primary'
            >
                Войти!
            </Button>
        </form>
    );
};
