import { motion } from 'framer-motion';
import logoUrl from './logo.jpg';
import { Menu } from '../menu/component';
import styles from './style.module.scss';
import classNames from 'classnames';
import { UserInfoNavbarContainer } from '../userInfoNavbar/container';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <motion.div className={classNames(styles.navbar)}>
            <Menu />
            <Link to='/'>
                <img
                    height='50px'
                    src={logoUrl}
                    alt='logo'
                />
            </Link>
            <UserInfoNavbarContainer />
        </motion.div>
    );
};
