import { FunctionComponent, useEffect, useState } from 'react';
import {
    ProductContainer,
    ProductContainerProps,
} from '../../components/product/container';
import { getProductById } from '.';
export const ProductByIdContainer: FunctionComponent<{ id: string }> = ({
    id,
}) => {
    const [{ name }, setProps] = useState<ProductContainerProps>({
        id: id,
        name: '',
    });

    useEffect(() => {
        getProductById(id).then((response) => {
            setProps({ id: id, name: response.name });
        });
    });

    return (
        <ProductContainer
            id={id}
            name={name}
        />
    );
};
