import { FunctionComponent, PropsWithChildren } from 'react';
import { Loader } from '../loader/component';

type Props = {
    isLoading: boolean;
    height?: string;
};

export const WithLoader: FunctionComponent<PropsWithChildren<Props>> = ({
    isLoading,
    children,
    height,
}) => {
    return isLoading ? (
        <Loader height={height}>{children}</Loader>
    ) : (
        <>{children}</>
    );
};
