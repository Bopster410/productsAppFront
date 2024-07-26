import classNames from 'classnames';
import { Navbar } from '../navbar/component';
import { Outlet } from 'react-router-dom';
import styles from './style.module.scss';

export const Layout = () => {
    return (
        <div className={classNames(styles.layout)}>
            <header className={styles.header}>
                <div className='container'>
                    <Navbar />
                </div>
            </header>
            <main className={classNames(styles.main, 'container')}>
                <Outlet />
            </main>
        </div>
    );
};
