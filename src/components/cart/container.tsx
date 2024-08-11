import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Products } from '../products/component';
import { ProductContainerProps } from '../product/container';
import { getUserCart } from '../../api/user';
import { usePrivateRequest } from '../../hooks/usePrivateRequest';
import { useSelector } from 'react-redux';
import { isUserLogged } from '../../store/user';
import { RootState } from '../../store';
import { handleLongRequest } from '../../utils/api/ajax/throttling';
import { WithLoader } from '../uikit/withLoader/component';

export const CartContainer = () => {
    const navigate = useNavigate();
    const axiosInstance = usePrivateRequest();

    const [productsInCart, setProductsInCart] = useState<
        ProductContainerProps[]
    >([]);
    const [isLoading, setLoading] = useState(false);

    const isLogged = useSelector((state: RootState) => isUserLogged(state));

    useEffect(() => {
        if (!isLogged) {
            navigate('/', { replace: true });
            return;
        }

        handleLongRequest(
            () => getUserCart(axiosInstance),
            () => setLoading(true),
            () => setLoading(false),
            {
                thenFunc: (response) => {
                    console.log(response);
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
                        navigate('/', { replace: true });
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
            <Products products={productsInCart} />
        </WithLoader>
    );
};
