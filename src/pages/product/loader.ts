import { getProductById } from '@/api/products';
import { throwRouterError } from '@/components/errorBoundary/component';
import { LoaderFunction } from 'react-router-dom';

export const loader: LoaderFunction = async ({ params }) => {
    const response = await getProductById(params.id);
    if (!response?.data)
        throw throwRouterError(
            'Что-то пошло не так',
            'Попробуйте ещё раз позже'
        );

    return response;
};
