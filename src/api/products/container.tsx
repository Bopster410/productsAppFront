import { FunctionComponent, useEffect, useState } from 'react';
import { ProductContainer } from '@/components/product/container';
import { getProductById } from '.';
import { handleLongRequest } from '@/utils/api/ajax/throttling';
import { WithLoader } from '@/uikit/withLoader/component';
import { ProductProps } from '@/components/product/component';

type Props = {
    id: string;
    ProductCard?: React.ComponentType<ProductProps>;
};

export const ProductByIdContainer: FunctionComponent<Props> = ({
    id,
    ProductCard,
}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        handleLongRequest(
            () => getProductById(id),
            () => setLoading(true),
            () => setLoading(false),
            {
                thenFunc: (response) => {
                    if (response?.data === undefined) return;

                    setName(response.data.name);
                    setPrice(response.data.price);
                    setDescription(response.data.description);
                    setRating(response.data.rating);
                    setTotalComments(response.data.totalComments);
                },
                handleAfter: 500,
                handleFor: 1000,
            }
        )();
    }, []);

    return (
        <WithLoader
            height='50vh'
            isLoading={isLoading}
        >
            {name !== '' && (
                <ProductContainer
                    id={id}
                    name={name}
                    price={price}
                    totalComments={totalComments}
                    rating={rating}
                    description={description}
                    ProductCard={ProductCard}
                />
            )}
        </WithLoader>
    );
};
