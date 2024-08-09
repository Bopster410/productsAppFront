import { FunctionComponent, useEffect, useState } from 'react';
import { ProductContainer } from '../../components/product/container';
import { getProductById } from '.';
import { handleLongRequest } from '../../utils/api/ajax/throttling';
import { WithLoader } from '../../components/uikit/withLoader/component';
export const ProductByIdContainer: FunctionComponent<{ id: string }> = ({
    id,
}) => {
    const [name, setName] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        handleLongRequest(
            () => getProductById(id),
            () => setLoading(true),
            () => setLoading(false),
            {
                thenFunc: (response) => {
                    if (response?.data === undefined) return;
                    setName(response.data?.name);
                },
                handleAfter: 500,
                handleFor: 1000,
            }
        )();
    }, []);

    return (
        <WithLoader
            height='50vh'
            isLoading={isLoading}
        >
            {name !== '' && (
                <ProductContainer
                    id={id}
                    name={name}
                />
            )}
        </WithLoader>
    );
};
