import { getAllProducts } from '@/api/products';
import { throwRouterError } from '@/components/errorBoundary/component';
import { LoaderFunction } from 'react-router-dom';

export const loader: LoaderFunction = async () => {
    const response = await getAllProducts();
    if (!response?.data)
        throw throwRouterError(
            'Что-то пошло не так',
            'Попробуйте ещё раз позже'
        );

    return response;
};
