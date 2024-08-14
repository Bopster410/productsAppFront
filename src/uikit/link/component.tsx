import { FunctionComponent } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './style.module.scss';

export const LinkCustom: FunctionComponent<LinkProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <Link
            {...props}
            className={styles['link']}
        >
            {children}
        </Link>
    );
};
