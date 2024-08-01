import { Products } from './component';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';
import { ProductContainerProps } from '../product/container';

export const ProductsContainter = () => {
    const [products, setProducts] = useState<ProductContainerProps[]>([]);
    useEffect(() => {
        getAllProducts().then((response) => {
            if (!response) return;

            const newProducts = [...products];
            response.data?.forEach(({ productId, name }) => {
                newProducts.push({ id: productId, name });
            });
            setProducts(newProducts);
        });
    }, []);

    return <Products products={products} />;
};
