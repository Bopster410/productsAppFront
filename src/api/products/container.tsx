import { FunctionComponent, useEffect, useState } from 'react';
import { ProductContainer } from '../../components/product/container';
import { getProductById } from '.';
export const ProductByIdContainer: FunctionComponent<{ id: string }> = ({
    id,
}) => {
    const [name, setName] = useState('');

    useEffect(() => {
        getProductById(id).then((response) => {
            if (response.data === undefined) return;
            setName(response.data?.name);
        });
    }, []);

    return (
        <ProductContainer
            id={id}
            name={name}
        />
    );
};
