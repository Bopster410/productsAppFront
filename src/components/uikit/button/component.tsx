import { FunctionComponent } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import { HTMLMotionProps, motion } from 'framer-motion';

interface Props extends HTMLMotionProps<'button'> {
    color?: 'primary' | 'secondary' | 'outline';
}

const tapAnimation = {
    primary: { scale: 0.9 },
    secondary: { scale: 0.9 },
    outline: { scale: 0.9 },
};

export const Button: FunctionComponent<Props> = ({
    children,
    color,
    ...props
}) => {
    return (
        <motion.button
            {...props}
            whileTap={tapAnimation[color ?? 'primary']}
            className={classNames(
                styles.button,
                styles[`button_${color ?? 'primary'}`]
            )}
        >
            {children}
        </motion.button>
    );
};

export type { Props as ButtonProps };
