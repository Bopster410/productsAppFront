import { Products } from './component';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';
import { ProductContainerProps } from '../product/container';
import { WithLoader } from '@/uikit/withLoader/component';
import { handleLongRequest } from '@/utils/api/ajax/throttling';
import { WithErrorPlaceholder } from '../error/component';

export const ProductsContainter = () => {
    const [products, setProducts] = useState<ProductContainerProps[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(true);

    useEffect(() => {
        handleLongRequest(
            getAllProducts,
            () => setLoading(true),
            () => setLoading(false),
            {
                thenFunc: (response) => {
                    if (response?.status !== 200) return setSuccess(false);

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
                catchFunc: () => setSuccess(false),
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
            <WithErrorPlaceholder success={success}>
                <Products products={products} />
            </WithErrorPlaceholder>
        </WithLoader>
    );
};
