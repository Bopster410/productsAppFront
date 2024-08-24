import { FunctionComponent } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Product } from '@/api/products/types';
import { DataResponce } from '@/utils/api/ajax/index.types';
import { Products } from '@/components/products/component';
import { ProductContainerProps } from '@/components/product/container';

export const MainPage: FunctionComponent = () => {
    const { data } = useLoaderData() as DataResponce<Product[]>;
    if (!data) return;

    return (
        <Products
            products={data.map(
                ({
                    productId,
                    name,
                    rating,
                    totalComments,
                    description,
                    price,
                }) => ({
                    id: productId,
                    name,
                    rating,
                    totalComments,
                    description,
                    price,
                }),
                [] as ProductContainerProps[]
            )}
        />
    );
};
