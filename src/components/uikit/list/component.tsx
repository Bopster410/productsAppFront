import { FunctionComponent, ReactNode } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';

type Props = {
    wrap?: boolean;
    direction?: 'column' | 'row';
    items: (() => { key: string; node: ReactNode })[];
};

const listItemsVariants: Variants = {
    opened: {
        x: 0,
        opacity: 1,
        transition: { type: 'spring', bounce: 0 },
    },
    closed: {
        x: -20,
        opacity: 0,
        transition: { duration: 0.3 },
    },
};

export const List: FunctionComponent<Props> = ({ items, wrap, direction }) => {
    return (
        <div
            className={classNames(
                styles.list,
                direction === 'row'
                    ? styles['list_row']
                    : styles['list_column'],
                wrap && styles['list_wrap']
            )}
        >
            {items.map((item) => {
                const { key, node } = item();
                return (
                    <motion.div
                        key={key}
                        variants={listItemsVariants}
                        initial='closed'
                        animate='opened'
                        exit='closed'
                    >
                        {node}
                    </motion.div>
                );
            })}
        </div>
    );
};
