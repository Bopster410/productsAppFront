import { useRouteError } from 'react-router-dom';
import { ErrorMessage } from '../error/component';

type RouterError = {
    description: string | React.ReactNode;
    header: string;
};

export function throwRouterError(
    header: string,
    description: string | React.ReactNode
): RouterError {
    return {
        header,
        description,
    };
}

export const ErrorBoundary = () => {
    const error = useRouteError() as RouterError;
    return (
        <ErrorMessage
            header={error.header}
            description={error.description}
        />
    );
};
