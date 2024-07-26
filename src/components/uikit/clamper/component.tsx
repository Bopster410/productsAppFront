import { FunctionComponent, PropsWithChildren, useEffect, useRef } from 'react';
import styles from './style.module.scss';

type Props = {
    maxLines: number;
};

export const Clamper: FunctionComponent<PropsWithChildren<Props>> = ({
    maxLines,
    children,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!ref.current) return;

        ref.current.style.webkitLineClamp = `${maxLines}`;
    }, []);

    return (
        <div
            className={styles.clamper}
            ref={ref}
        >
            {children}
        </div>
    );
};
