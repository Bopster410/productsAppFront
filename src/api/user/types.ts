import { Product } from '../products/types';

export type CartProductIdsResponse = {
    total: number;
    productId: string;
}[];

export type CartResponse = {
    product: Product;
    total: number;
}[];

export type ChangeCartResponse = {
    total: number;
};
