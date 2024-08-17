import React, { FunctionComponent } from 'react';
import styles from './style.module.scss';
import { useCycle } from 'framer-motion';
import { ButtonProps } from '../button/component';

interface AcceptedButtonProps extends ButtonProps {
    isOpened: boolean;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    InputComponent: React.ComponentType<
        React.InputHTMLAttributes<HTMLInputElement>
    >;
    ButtonComponent?: React.ComponentType<AcceptedButtonProps>;
    error?: string;
    onError?: () => void;
    success?: boolean;
    onSuccess?: () => void;
}

export const FormInput: FunctionComponent<Props> = ({
    placeholder,
    value,
    InputComponent,
    ButtonComponent,
    type,
    error,
    success,
    ...props
}) => {
    const [isOpened, toggleOpened] = useCycle(false, true);

    return (
        <div className={styles['input-container']}>
            <InputComponent
                {...props}
                type={type === 'password' && !isOpened ? 'password' : 'text'}
                value={value}
            />
            {placeholder && (
                <label className={styles['input-placeholder']}>
                    {success && !error && (
                        <svg
                            width='10'
                            height='10'
                            viewBox='0 0 10 10'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M5 0C2.25 0 0 2.25 0 5C0 7.75 2.25 10 5 10C7.75 10 10 7.75 10 5C10 2.25 7.75 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9ZM7.295 2.79L4 6.085L2.705 4.795L2 5.5L4 7.5L8 3.5L7.295 2.79Z'
                                fill='var(--color-main-success)'
                            />
                        </svg>
                    )}
                    {!success && error && (
                        <svg
                            width='10'
                            height='10'
                            viewBox='0 0 10 10'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M4.5 6.5H5.5V7.5H4.5V6.5ZM4.5 2.5H5.5V5.5H4.5V2.5ZM5 0C2.235 0 0 2.25 0 5C0 6.32608 0.526784 7.59785 1.46447 8.53553C1.92876 8.99983 2.47995 9.36812 3.08658 9.6194C3.69321 9.87067 4.34339 10 5 10C6.32608 10 7.59785 9.47322 8.53553 8.53553C9.47322 7.59785 10 6.32608 10 5C10 4.34339 9.87067 3.69321 9.6194 3.08658C9.36812 2.47995 8.99983 1.92876 8.53553 1.46447C8.07124 1.00017 7.52005 0.631876 6.91342 0.380602C6.30679 0.129329 5.65661 0 5 0ZM5 9C3.93913 9 2.92172 8.57857 2.17157 7.82843C1.42143 7.07828 1 6.06087 1 5C1 3.93913 1.42143 2.92172 2.17157 2.17157C2.92172 1.42143 3.93913 1 5 1C6.06087 1 7.07828 1.42143 7.82843 2.17157C8.57857 2.92172 9 3.93913 9 5C9 6.06087 8.57857 7.07828 7.82843 7.82843C7.07828 8.57857 6.06087 9 5 9Z'
                                fill='var(--color-main-red)'
                            />
                        </svg>
                    )}
                    {placeholder}
                </label>
            )}
            {type === 'password' && ButtonComponent && (
                <ButtonComponent
                    onClick={() => toggleOpened()}
                    isOpened={!isOpened}
                    color='secondary'
                    style={{ translateY: '-50%' }}
                />
            )}
        </div>
    );
};
