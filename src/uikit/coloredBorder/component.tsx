import styles from './style.module.scss';

type Props = {
    color: string;
    duration: number;
};

import { motion } from 'framer-motion';
import { FunctionComponent, PropsWithChildren } from 'react';
export const ColoredBorder: FunctionComponent<PropsWithChildren<Props>> = ({
    color,
    duration,
    children,
}) => {
    return (
        <motion.div
            initial={false}
            animate={{
                borderColor: [null, `rgba(${color}, 1)`, `rgba(${color}, 0)`],
                boxShadow: [
                    null,
                    `inset 0 0 16px 16px rgba(${color}, 0.25)`,
                    `inset 0 0 16px 16px rgba(${color}, 0)`,
                ],
            }}
            transition={{
                duration: duration,
                times: [0, 0.2, 1],
                ease: 'easeOut',
            }}
            className={styles['border-container']}
        >
            {children}
        </motion.div>
    );
};
