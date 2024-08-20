import { ajaxGet } from '@/utils/api';
import { Product } from './types';
import { PRODUCTS_URLS } from './urls';

export { ProductByIdContainer } from './container';

export function getAllProducts() {
    return ajaxGet<Product[]>(PRODUCTS_URLS.ALL);
}

export async function getProductById(id?: string) {
    if (!id) return;
    return ajaxGet<Product>(PRODUCTS_URLS.ID + id);
}
