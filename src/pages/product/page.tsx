import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ProductByIdContainer } from '../../api/products/container';

export const ProductPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id === undefined) navigate('/');
    }, [id]);

    return <>{id && <ProductByIdContainer id={id} />}</>;
};
