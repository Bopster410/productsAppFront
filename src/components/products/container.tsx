import { Products } from './component';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';
import { ProductContainerProps } from '../product/container';
import { WithLoader } from '@/uikit/withLoader/component';
import { handleLongRequest } from '@/utils/api/ajax/throttling';

export const ProductsContainter = () => {
    const [products, setProducts] = useState<ProductContainerProps[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        handleLongRequest(
            getAllProducts,
            () => setLoading(true),
            () => setLoading(false),
            {
                thenFunc: (response) => {
                    if (response?.status !== 200) throw 'wrong data';

                    const newProducts = [...products];
                    response.data?.forEach(
                        ({
                            productId,
                            name,
                            rating,
                            description,
                            totalComments,
                            price,
                        }) => {
                            newProducts.push({
                                id: productId,
                                name,
                                rating,
                                totalComments,
                                description,
                                price,
                            });
                        }
                    );
                    setProducts(newProducts);
                },
                catchFunc: () => {
                    throw 'errr';
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
            <Products products={products} />
        </WithLoader>
    );
};
