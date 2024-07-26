import { forwardRef, ReactNode } from 'react';
import { MenuItem } from '../menuItem/component';
import styles from './style.module.scss';
import { List } from '../uikit/list/component';
import { motion, Variants } from 'framer-motion';

type Props = {
    items: { name: string; href: string; icon: () => ReactNode }[];
    onLinkClick?: () => void;
};

const variants: Variants = {
    opened: {
        clipPath: 'inset(-10% -10% -10% -10% round var(--border-radius-sm))',
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.4,
        },
    },
    closed: {
        clipPath: 'inset(10% 100% 100% 10% round var(--border-radius-sm))',
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.4,
        },
    },
};

export const MenuItems = forwardRef<HTMLDivElement, Props>(
    ({ items, onLinkClick }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={styles.navbar}
                variants={variants}
                initial='closed'
                animate='opened'
                exit='closed'
            >
                <List
                    items={items.map(({ href, name, icon }) => () => ({
                        key: href,
                        node: (
                            <MenuItem
                                onClick={() => {
                                    if (!onLinkClick) return;

                                    onLinkClick();
                                }}
                                href={href}
                                icon={icon}
                            >
                                {name}
                            </MenuItem>
                        ),
                    }))}
                />
            </motion.div>
        );
    }
);
