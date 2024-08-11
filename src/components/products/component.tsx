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
            items={products.map(
                ({ id, name, rating, price, description, totalComments }) =>
                    () => ({
                        node: (
                            <ProductContainer
                                id={id}
                                name={name}
                                rating={rating}
                                price={price}
                                description={description}
                                totalComments={totalComments}
                            />
                        ),
                        key: id,
                    })
            )}
        />
    );
};
