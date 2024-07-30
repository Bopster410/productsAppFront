import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Product } from './component';
import { decrement, increment, selectCartItemById } from '../../store/cart';

type Props = {
    id: string;
    name: string;
};
export type { Props as ProductContainerProps };

export const ProductContainer: FunctionComponent<Props> = ({ id, name }) => {
    const dispatch = useDispatch();

    const handleIncrement = () => dispatch(increment({ id, name }));
    const handleDecrement = () => dispatch(decrement(id));

    const totalInCart =
        useSelector(
            (state: RootState) => selectCartItemById(state, id)?.total
        ) ?? 0;

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
