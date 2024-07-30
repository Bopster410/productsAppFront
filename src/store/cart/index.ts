import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Indexed, RootState } from '../../store';
import { ProductContainerProps } from '../../components/product/container';

type State = Indexed<{
    total: number;
    props: ProductContainerProps;
}>;

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {} as State,
    reducers: {
        increment: (state, action: PayloadAction<ProductContainerProps>) => {
            const id = action.payload.id;

            if (state[id] === undefined) {
                state[id] = {
                    total: 0,
                    props: action.payload,
                };
            }

            state[id].total = (state[id].total || 0) + 1;
        },
        decrement: (state, action: PayloadAction<string>) => {
            const id = action.payload;

            if (state[id].total - 1 === 0) {
                delete state[id];
                return;
            }

            if (state[id].total - 1 > 0) state[id].total = state[id].total - 1;
        },
        setValue: (
            state,
            action: PayloadAction<{
                newTotal: number;
                props: ProductContainerProps;
            }>
        ) => {
            const { newTotal, props } = action.payload;

            if (newTotal < 0 || !props.id) return;

            if (!state[props.id])
                state[props.id] = {
                    total: 0,
                    props,
                };

            state[props.id].total = newTotal;
        },
    },
});

export const { increment, decrement, setValue } = cartSlice.actions;

export const selectCartItemById = (state: RootState, id: string) =>
    (state.cart as State)[id];

export const selectCartItems = createSelector(
    (state: RootState) => state.cart,
    (cart: State) => {
        const initItems = [] as ProductContainerProps[];
        return Object.values(cart).reduce((items, currentValue) => {
            items.push(currentValue.props);
            return items;
        }, initItems);
    }
);
