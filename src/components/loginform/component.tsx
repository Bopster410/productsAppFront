import { FunctionComponent, useContext } from 'react';
import { LogInFormProps } from './types';
import { Button } from '../uikit/button/component';
import { Input } from '../uikit/input/conponent';
import styles from './style.module.scss';
import { FormInput } from '../uikit/formInput/component';
import { EyeButton } from '../uikit/button/templates';
import { LogInFormDataContext } from '../../providers/loginForm/component';

export const LogInForm: FunctionComponent<LogInFormProps> = ({ onSubmit }) => {
    const { email, password, setPassword, setEmail, clearData } =
        useContext(LogInFormDataContext);

    return (
        <form
            className={styles['login-form']}
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit(email, password);
                clearData();
            }}
        >
            <FormInput
                InputComponent={Input}
                onChange={(event) => setEmail(event.target.value)}
                name='email'
                placeholder='ваша почта'
                value={email}
            />
            <FormInput
                InputComponent={Input}
                onChange={(event) => setPassword(event.target.value)}
                name='password'
                placeholder='пароль'
                type='password'
                value={password}
                ButtonComponent={EyeButton}
            />
            <Button
                size='xl'
                type='submit'
                color='primary'
            >
                Войти!
            </Button>
        </form>
    );
};
