import { FunctionComponent } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import { HTMLMotionProps, motion } from 'framer-motion';

interface Props extends HTMLMotionProps<'button'> {
    color?: 'primary' | 'white' | 'secondary' | 'red';
    size?: 'xs' | 'sm' | 'normal' | 'xl';
}

const tapAnimation = {
    primary: { scale: 0.9 },
    white: { scale: 0.9 },
    secondary: { scale: 0.9 },
    red: { scale: 0.9 },
};

export const Button: FunctionComponent<Props> = ({
    children,
    color,
    size,
    disabled,
    ...props
}) => {
    return (
        <motion.button
            {...props}
            disabled={disabled}
            whileTap={tapAnimation[color ?? 'primary']}
            className={classNames(
                styles.button,
                styles[`button_${color ?? 'primary'}`],
                styles[`button_${size ?? 'normal'}`],
                disabled ? styles['button_disabled'] : ''
            )}
        >
            {children}
        </motion.button>
    );
};

export type { Props as ButtonProps };
