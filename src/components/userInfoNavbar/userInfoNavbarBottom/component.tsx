import { FunctionComponent } from 'react';
import { LogInForm } from '../../loginform/component';
// import { OptionsButton } from '../@/uikit/button/templates';
import { UserInfo } from '../../userInfo/component';
import { WithAuthorization } from '@/uikit/withAuthorization/component';
import styles from './style.module.scss';

type Props = {
    isLogged: boolean;
    email?: string;
    disabled?: boolean;
    onLogOut: () => void;
    onLogInSubmit: (email?: string, password?: string) => void;
};

export const UserInfoNavbarBottom: FunctionComponent<Props> = ({
    isLogged,
    email,
    onLogInSubmit,
    onLogOut,
    disabled,
}) => {
    return (
        <div
            style={{
                marginTop: isLogged ? '10px' : '22px',
            }}
            className={styles['user-info-bottom-container']}
        >
            <WithAuthorization
                isLogged={isLogged}
                authorized={
                    <>
                        <UserInfo
                            disabled={disabled}
                            email={email}
                            onLogOut={onLogOut}
                        />
                        {/* <span className={styles['user-info-options-button']}>
                            <OptionsButton
                                variants={{
                                    opened: { opacity: 1 },
                                    closed: { opacity: 0 },
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                size='xs'
                                color='secondary'
                            />
                        </span> */}
                    </>
                }
                notAuthorized={
                    <LogInForm
                        disabled={disabled}
                        onSubmit={onLogInSubmit}
                    />
                }
            />
        </div>
    );
};
