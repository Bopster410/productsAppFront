import {
    FunctionComponent,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import styles from './style.module.scss';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import classNames from 'classnames';
import { useDropdown } from '../../hooks/useDropdown';
import { LogInFormDataContext } from '../../providers/loginForm/component';
import { UserInfoNavbarTop } from './userInfoNavbarTop/component';
import { UserInfoNavbarBottom } from './userInfoNavbarBottom/component';

const USER_LOGGED_IN_TOP_HEIGHT = 50;
const USER_LOGGED_OUT_TOP_HEIGHT = 32;
const USER_LOGGED_IN_OPENED_HEIGHT = 180;
const USER_LOGGED_OUT_OPENED_HEIGHT = 251;

type Props = {
    isLogged: boolean;
    userInfo: { email?: string };
    onLogInSubmit: (email?: string, password?: string) => void;
    onLogOut: () => void;
};

const variants: Variants = {
    opened: (h) => ({
        boxShadow: 'var(--shadow)',
        padding: '16px',
        height: h.opened,
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.2,
        },
    }),
    closed: (h) => ({
        boxShadow: 'none',
        padding: '0',
        height: h.closed,
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.2,
        },
    }),
};

export const UserInfoNavbar: FunctionComponent<Props> = ({
    isLogged,
    onLogInSubmit,
    userInfo,
    onLogOut,
}) => {
    const { isShown, show, hide, dropdownRef } = useDropdown();
    const [isFocused, setFocused] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const { email, password } = useContext(LogInFormDataContext);

    useEffect(() => {
        const focusInCallback = () => setFocused(true);
        const focusOutCallback = () => setFocused(false);

        if (!cardRef.current) return;

        cardRef.current.addEventListener('focusin', () => focusInCallback());
        cardRef.current.addEventListener('focusout', () => focusOutCallback());

        return () => {
            cardRef.current?.removeEventListener('focusin', () =>
                focusInCallback()
            );
            cardRef.current?.removeEventListener('focusout', () =>
                focusOutCallback()
            );
        };
    }, [setFocused, cardRef]);

    return (
        <div
            ref={cardRef}
            className={styles['user-info-container']}
        >
            <motion.div
                ref={dropdownRef}
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
                        ? {
                              closed: `${USER_LOGGED_IN_TOP_HEIGHT}px`,
                              opened: `${USER_LOGGED_IN_OPENED_HEIGHT}px`,
                          }
                        : {
                              closed: `${USER_LOGGED_OUT_TOP_HEIGHT}px`,
                              opened: `${USER_LOGGED_OUT_OPENED_HEIGHT}px`,
                          }
                }
                animate={isShown ? 'opened' : 'closed'}
                onMouseEnter={show}
                onMouseLeave={() => {
                    if (
                        email.length === 0 &&
                        password.length === 0 &&
                        !isFocused
                    )
                        hide();
                }}
            >
                <UserInfoNavbarTop
                    isLogged={isLogged}
                    topText={isShown ? 'Войти по почте' : 'Войти'}
                />
                <AnimatePresence>
                    {isShown && (
                        <UserInfoNavbarBottom
                            isLogged={isLogged}
                            onLogInSubmit={onLogInSubmit}
                            onLogOut={onLogOut}
                            email={userInfo.email}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
