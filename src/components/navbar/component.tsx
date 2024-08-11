import { motion } from 'framer-motion';
import logoUrl from './logo.jpg';
import { Menu } from '../menu/component';
import styles from './style.module.scss';
import classNames from 'classnames';
import { UserInfoNavbarContainer } from '../userInfoNavbar/container';

export const Navbar = () => {
    return (
        <motion.div className={classNames(styles.navbar)}>
            <Menu />
            <img
                height='50px'
                src={logoUrl}
                alt='logo'
            />
            <UserInfoNavbarContainer />
        </motion.div>
    );
};
