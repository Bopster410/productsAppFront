import { FunctionComponent } from 'react';
import placeholderUrl from './placeholder.jpg';
import { Helmet } from 'react-helmet';

type Props = {
    name: string;
    description: string;
};

export const ProductOpenGraph: FunctionComponent<Props> = ({
    name,
    description,
}) => {
    return (
        <Helmet>
            <meta
                property='og:title'
                content={name}
            />
            <meta
                property='og:description'
                content={description}
            />
            <meta
                property='og:image'
                content={placeholderUrl}
            />
        </Helmet>
    );
};
