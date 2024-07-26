import { FunctionComponent } from 'react';
import { ProductContainer, ProductContainerProps } from '../product/container';
import { List } from '../uikit/list/component';

export const Products: FunctionComponent<{
    products: ProductContainerProps[];
}> = ({ products }) => {
    return (
        <List
            wrap
            direction='row'
            items={products.map(({ id, name }) => () => ({
                node: (
                    <ProductContainer
                        id={id}
                        name={name}
                    />
                ),
                key: id,
            }))}
        />
    );
};
