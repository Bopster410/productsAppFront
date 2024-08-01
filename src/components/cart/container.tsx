import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Products } from '../products/component';
import { ProductContainerProps } from '../product/container';
import { getUserCart } from '../../api/user';
import { usePrivateRequest } from '../../hooks/usePrivateRequest';
import { useSelector } from 'react-redux';
import { isUserLogged } from '../../store/user';
import { RootState } from '../../store';

export const CartContainer = () => {
    const navigate = useNavigate();
    const axiosInstance = usePrivateRequest();

    const [productsInCart, setProductsInCart] = useState<
        ProductContainerProps[]
    >([]);

    const isLogged = useSelector((state: RootState) => isUserLogged(state));

    useEffect(() => {
        if (!isLogged) {
            navigate('/', { replace: true });
            return;
        }

        getUserCart(axiosInstance).then(({ status, data }) => {
            if (status !== 200 || !data) return;

            const loadedProducts: ProductContainerProps[] = [];

            data.forEach(({ product }) =>
                loadedProducts.push({
                    id: product.productId,
                    name: product.name,
                })
            );

            if (loadedProducts.length === 0) {
                navigate('/', { replace: true });
                return;
            }

            setProductsInCart(loadedProducts);
        });
    }, [isLogged]);

    return <Products products={productsInCart} />;
};
