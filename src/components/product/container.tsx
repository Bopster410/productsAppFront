import { FunctionComponent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { Product, ProductProps } from './component';
import {
    addProductToCartThunk,
    removeProductFromCartThunk,
} from '@/store/user/thunks';
import { usePrivateRequest } from '@/hooks/usePrivateRequest';
import { selectCartItemById } from '@/store/user';
import { handleLongRequest } from '@/utils/api/ajax/throttling';

type Props = {
    id: string;
    name: string;
    price: number;
    totalComments: number;
    description: string;
    rating: number;
    ProductCard?: React.ComponentType<ProductProps>;
};
export type { Props as ProductContainerProps };

export const ProductContainer: FunctionComponent<Props> = ({
    id,
    name,
    price,
    rating,
    totalComments,
    description,
    ProductCard = Product,
}) => {
    const [isLoading, setLoading] = useState(false);

    const axiosInstance = usePrivateRequest();

    const dispatch = useAppDispatch();

    const handleIncrement = useCallback(
        handleLongRequest(
            () =>
                dispatch(
                    addProductToCartThunk({ productId: id, axiosInstance })
                ),
            () => setLoading(true),
            () => setLoading(false),
            { handleAfter: 500, handleFor: 1000 }
        ),
        [id, axiosInstance, setLoading]
    );

    const handleDecrement = useCallback(
        handleLongRequest(
            () =>
                dispatch(
                    removeProductFromCartThunk({ productId: id, axiosInstance })
                ),
            () => setLoading(true),
            () => setLoading(false),
            { handleAfter: 500, handleFor: 1000 }
        ),
        [id, axiosInstance, setLoading]
    );

    const totalInCart =
        useSelector((state: RootState) => selectCartItemById(state, id)) ?? 0;

    return (
        <>
            <ProductCard
                name={name}
                isLoading={isLoading}
                id={id}
                onAdd={handleIncrement}
                onDelete={handleDecrement}
                totalInCart={totalInCart}
                price={price}
                totalComments={totalComments}
                rating={rating}
                description={description}
            />
        </>
    );
};
