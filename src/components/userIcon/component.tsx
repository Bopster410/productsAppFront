import { FunctionComponent, useState } from 'react';
import styles from './style.module.scss';
import defaultUserIcon from './user.jpg';
import { LogInForm } from '../loginform/component';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import classNames from 'classnames';
import { Button } from '../uikit/button/component';

const USER_LOGGED_IN_TOP_HEIGHT = 50;
const USER_LOGGED_OUT_TOP_HEIGHT = 22;
const USER_LOGGED_IN_CLOSED_WIDTH = 50;
const USER_LOGGED_OUT_CLOSED_WIDTH = 75;
const USER_LOGGED_IN_OPENED_WIDTH = 152;
const USER_LOGGED_OUT_OPENED_WIDTH = 168;

type Props = {
    isLogged: boolean;
    userInfo: { email?: string };
    onLogInSubmit: (email?: string, password?: string) => void;
    onLogOut: () => void;
};

const variants: Variants = {
    opened: {
        boxShadow: 'var(--shadow)',
        padding: '16px',
        height: 'max-content',
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.2,
        },
    },
    closed: (h) => ({
        boxShadow: 'none',
        padding: '0',
        height: h,
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.2,
        },
    }),
};

const variantsTop: Variants = {
    opened: (w) => ({
        width: w.opened,
    }),
    closed: (w) => ({
        width: w.closed,
    }),
};

export const UserIcon: FunctionComponent<Props> = ({
    isLogged,
    onLogInSubmit,
    userInfo,
    onLogOut,
}) => {
    const [isDropdownShown, setIsDropdownShown] = useState(false);

    return (
        <div className={styles['user-info-container']}>
            <motion.div
                className={classNames(styles['user-info-card'])}
                style={{
                    top: isLogged
                        ? `-${USER_LOGGED_IN_TOP_HEIGHT / 2}px`
                        : `-${USER_LOGGED_OUT_TOP_HEIGHT / 2}px`,
                }}
                variants={variants}
                initial={false}
                custom={
                    isLogged
                        ? `${USER_LOGGED_IN_TOP_HEIGHT}px`
                        : `${USER_LOGGED_OUT_TOP_HEIGHT}px`
                }
                animate={isDropdownShown ? 'opened' : 'closed'}
                onMouseEnter={() => setIsDropdownShown(true)}
                onMouseLeave={() => setIsDropdownShown(false)}
            >
                <motion.div
                    className={styles['user-info-top-container']}
                    variants={variantsTop}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    custom={
                        isLogged
                            ? {
                                  opened: USER_LOGGED_IN_OPENED_WIDTH,
                                  closed: USER_LOGGED_IN_CLOSED_WIDTH,
                              }
                            : {
                                  opened: USER_LOGGED_OUT_OPENED_WIDTH,
                                  closed: USER_LOGGED_OUT_CLOSED_WIDTH,
                              }
                    }
                    layout
                >
                    {isLogged ? (
                        <img
                            className={styles['user-icon-img']}
                            src={defaultUserIcon}
                            alt='user icon'
                        />
                    ) : (
                        <span
                            className={classNames('p-b', 'pointer-none')}
                            onClick={() =>
                                setIsDropdownShown((current) => !current)
                            }
                        >
                            Войти!
                        </span>
                    )}
                </motion.div>
                <AnimatePresence>
                    {isDropdownShown && (
                        <div className={styles['user-info-bottom-container']}>
                            {isLogged ? (
                                <>
                                    <div
                                        className={
                                            styles['user-info-main-data']
                                        }
                                    >
                                        <span className='p-b'>
                                            {userInfo.email}
                                        </span>
                                    </div>
                                    <Button
                                        onClick={onLogOut}
                                        color='primary'
                                    >
                                        Выйти
                                    </Button>
                                </>
                            ) : (
                                <LogInForm onSubmit={onLogInSubmit} />
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
