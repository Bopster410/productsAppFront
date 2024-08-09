import { motion, Variants } from 'framer-motion';
import { FunctionComponent } from 'react';
import { WithAuthorization } from '../../uikit/withAuthorization/component';
import styles from './style.module.scss';
import defaultUserIcon from './user.jpg';
import classNames from 'classnames';

const USER_LOGGED_IN_OPENED_WIDTH = 142;
const USER_LOGGED_OUT_OPENED_WIDTH = 268;
const USER_LOGGED_IN_CLOSED_WIDTH = 50;
const USER_LOGGED_OUT_CLOSED_WIDTH = 75;

const variantsTop: Variants = {
    opened: (w) => ({
        width: w.opened,
    }),
    closed: (w) => ({
        width: w.closed,
    }),
};

const variantsUserImg: Variants = {
    opened: {
        height: '70px',
        width: '70px',
    },
    closed: {
        height: '50px',
        width: '50px',
    },
};

type Props = {
    isLogged: boolean;
    topText: string;
};

export const UserInfoNavbarTop: FunctionComponent<Props> = ({
    isLogged,
    topText,
}) => {
    return (
        <motion.div
            className={styles['user-info-top-container']}
            variants={variantsTop}
            transition={{ duration: 0.2, type: 'spring' }}
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
        >
            <WithAuthorization
                isLogged={isLogged}
                authorized={
                    <motion.img
                        variants={variantsUserImg}
                        transition={{
                            duration: 0.1,
                            type: 'spring',
                        }}
                        className={styles['user-icon-img']}
                        src={defaultUserIcon}
                        alt='user icon'
                    />
                }
                notAuthorized={
                    <span className={classNames('h5', styles['log-in-text'])}>
                        {topText}
                    </span>
                }
            />
        </motion.div>
    );
};
