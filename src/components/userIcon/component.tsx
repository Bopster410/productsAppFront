import { FunctionComponent } from 'react';
import styles from './style.module.scss';
import defaultUserIcon from './user.jpg';

type Props = {};

export const UserIcon: FunctionComponent<Props> = () => {
    return (
        <div>
            <img
                className={styles['user-icon-img']}
                src={defaultUserIcon}
                alt='user icon'
            />
        </div>
    );
};
