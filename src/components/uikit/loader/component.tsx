import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './style.module.scss';

type Props = {
    height?: string;
};

export const Loader: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    height,
}) => {
    return (
        <div
            style={{ height: height }}
            className={styles.loader}
        >
            {children}
        </div>
    );
};
