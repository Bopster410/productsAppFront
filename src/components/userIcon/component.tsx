import { FunctionComponent, useState } from 'react';
import styles from './style.module.scss';
import defaultUserIcon from './user.jpg';
import { LogInForm } from '../loginform/component';

type Props = {
    isLogged: boolean;
    onLogInSubmit: (email?: string, password?: string) => void;
};

export const UserIcon: FunctionComponent<Props> = ({
    isLogged,
    onLogInSubmit,
}) => {
    const [isDropdownShown, setIsDropdownShown] = useState(false);

    return (
        <div>
            <div onMouseEnter={() => setIsDropdownShown(true)}>
                {isLogged ? (
                    <img
                        className={styles['user-icon-img']}
                        src={defaultUserIcon}
                        alt='user icon'
                    />
                ) : (
                    <span>Log In!</span>
                )}
            </div>
            {isDropdownShown && (
                <div onMouseLeave={() => setIsDropdownShown(false)}>
                    <LogInForm onSubmit={onLogInSubmit} />
                </div>
            )}
        </div>
    );
};
