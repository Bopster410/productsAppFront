import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { Product } from './component';
import {
    addProductToCartThunk,
    removeProductFromCartThunk,
} from '../../store/user/thunks';
import { usePrivateRequest } from '../../hooks/usePrivateRequest';
import { selectCartItemById } from '../../store/user';

type Props = {
    id: string;
    name: string;
};
export type { Props as ProductContainerProps };

export const ProductContainer: FunctionComponent<Props> = ({ id, name }) => {
    const axiosInstance = usePrivateRequest();

    const dispatch = useAppDispatch();

    const handleIncrement = () =>
        dispatch(addProductToCartThunk({ productId: id, axiosInstance }));
    const handleDecrement = () =>
        dispatch(removeProductFromCartThunk({ productId: id, axiosInstance }));

    const totalInCart =
        useSelector((state: RootState) => selectCartItemById(state, id)) ?? 0;

    return (
        <Product
            name={name}
            id={id}
            onAdd={handleIncrement}
            onDelete={handleDecrement}
            totalInCart={totalInCart}
        />
    );
};
