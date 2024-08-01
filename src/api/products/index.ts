import { ajaxGet } from '../../utils/api';
import { Product } from './types';
import { PRODUCTS_URLS } from './urls';

export { ProductByIdContainer } from './container';

export function getAllProducts() {
    return ajaxGet<Product[]>(PRODUCTS_URLS.ALL);
}

export function getProductById(id: string) {
    return ajaxGet<Product>(PRODUCTS_URLS.ID + id);
}
