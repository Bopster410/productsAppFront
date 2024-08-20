import classNames from 'classnames';
import { Navbar } from '../navbar/component';
import styles from './style.module.scss';
import { LoadingBarGlobal } from '../loadingBar/component';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Layout = () => {
    return (
        <div className={classNames(styles.layout)}>
            <LoadingBarGlobal />
            <header className={styles.header}>
                <div className='container'>
                    <Navbar />
                </div>
            </header>
            <main className={classNames(styles.main, 'container')}>
                <motion.div>
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};
