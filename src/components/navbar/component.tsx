import { useEffect, useRef } from 'react';
import { isClickOut } from '../../utils/clickOut';
import { motion, useCycle } from 'framer-motion';
import logoUrl from './logo.jpg';
import { Menu } from '../menu/component';
import { UserIcon } from '../userIcon/component';
import styles from './style.module.scss';
import classNames from 'classnames';

// logo size: height 50

export const Navbar = () => {
    const [isShown, toggleShown] = useCycle(false, true);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const isClickedOut = isClickOut(ref.current, event);
            if (isClickedOut) toggleShown(0);
        };

        if (isShown) document.addEventListener('click', listener);

        return () => document.removeEventListener('click', listener);
    }, [isShown]);

    return (
        <motion.div
            initial={false}
            animate={isShown ? 'opened' : 'closed'}
            className={classNames(styles.navbar)}
        >
            <Menu
                onMenuButtonClick={(event) => {
                    toggleShown();
                    event.stopPropagation();
                }}
                isShown={isShown}
                onLinkClick={() => toggleShown(0)}
            />
            <img
                height='50px'
                src={logoUrl}
                alt='logo'
            />
            <UserIcon />
        </motion.div>
    );
};
