import { useEffect, useState } from 'react';
import { Products } from '../products/component';
import { ProductContainerProps } from '../product/container';
import { getUserCart } from '../../api/user';
import { usePrivateRequest } from '@/hooks/usePrivateRequest';
import { useSelector } from 'react-redux';
import { isUserLogged } from '@/store/user';
import { RootState } from '@/store';
import { handleLongRequest } from '@/utils/api/ajax/throttling';
import { WithLoader } from '@/uikit/withLoader/component';
import { ErrorMessage } from '../error/component';

export const CartItemsContainer = () => {
    const axiosInstance = usePrivateRequest();

    const [productsInCart, setProductsInCart] = useState<
        ProductContainerProps[]
    >([]);
    const [isLoading, setLoading] = useState(true);

    const isLogged = useSelector((state: RootState) => isUserLogged(state));

    useEffect(() => {
        if (!isLogged) {
            return;
        }

        handleLongRequest(
            () => getUserCart(axiosInstance),
            () => {},
            () => setLoading(false),
            {
                thenFunc: (response) => {
                    if (response?.status !== 200 || !response.data) return;

                    const loadedProducts: ProductContainerProps[] = [];

                    response?.data.forEach(({ product }) =>
                        loadedProducts.push({
                            id: product.productId,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            rating: product.rating,
                            totalComments: product.totalComments,
                        })
                    );

                    if (loadedProducts.length === 0) {
                        return;
                    }

                    setProductsInCart(loadedProducts);
                },
                handleAfter: 500,
                handleFor: 1000,
            }
        )();
    }, [isLogged]);

    return (
        <WithLoader
            isLoading={isLoading}
            height='50vh'
        >
            {productsInCart.length > 0 || isLoading ? (
                <Products products={productsInCart} />
            ) : (
                <ErrorMessage
                    header='Здесь пока что ничего нет :('
                    description='Скорее переходите в каталог!'
                />
            )}
        </WithLoader>
    );
};
