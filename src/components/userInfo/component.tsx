import { FunctionComponent } from 'react';
import { Button } from '@/uikit/button/component';
import styles from './style.module.scss';
import classNames from 'classnames';

type Props = {
    email?: string;
    disabled?: boolean;
    onLogOut: () => void;
};

export const UserInfo: FunctionComponent<Props> = ({
    email,
    onLogOut,
    disabled,
}) => {
    return (
        <div className={styles['user-info']}>
            <div className={styles['user-info-main-data']}>
                {email && (
                    <span
                        className={classNames('p-b', styles['user-info-item'])}
                    >
                        <svg
                            width='14'
                            height='11'
                            viewBox='0 0 14 11'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M1.33333 11C0.966667 11 0.652889 10.8696 0.392 10.6087C0.131111 10.3478 0.000444444 10.0338 0 9.66671V1.66671C0 1.30004 0.130667 0.986263 0.392 0.725374C0.653333 0.464485 0.967111 0.333818 1.33333 0.333374H12C12.3667 0.333374 12.6807 0.464041 12.942 0.725374C13.2033 0.986707 13.3338 1.30049 13.3333 1.66671V9.66671C13.3333 10.0334 13.2029 10.3474 12.942 10.6087C12.6811 10.87 12.3671 11.0005 12 11H1.33333ZM6.66667 6.33337L1.33333 3.00004V9.66671H12V3.00004L6.66667 6.33337ZM6.66667 5.00004L12 1.66671H1.33333L6.66667 5.00004ZM1.33333 3.00004V1.66671V9.66671V3.00004Z'
                                fill='currentColor'
                            />
                        </svg>
                        {email}
                    </span>
                )}
            </div>
            <Button
                disabled={disabled}
                onClick={onLogOut}
                color='red'
                size='sm'
            >
                Выйти
            </Button>
        </div>
    );
};
