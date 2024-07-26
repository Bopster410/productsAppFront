import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { selectCartItems } from './store';
import { useEffect } from 'react';
import { Products } from '../products/component';

export const CartContainer = () => {
    const navigate = useNavigate();

    const productsInCart = useSelector((state: RootState) =>
        selectCartItems(state)
    );

    useEffect(() => {
        if (productsInCart.length === 0) navigate('/', { replace: true });
    }, [productsInCart.length]);

    return <Products products={productsInCart} />;
};
