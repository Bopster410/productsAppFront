import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

import { ProductByIdContainer } from '../src/api/products';
import { renderWithProviders } from './setup';
import userEvent from '@testing-library/user-event';
import { selectCartItemById } from '@/store/user';

describe('product cards test', () => {
    test('get and show product by id', async () => {
        const initialState = {
            userInfo: {
                userInfo: null,
                tokens: null,
                cart: {},
                authRequestStatus: null,
                cartRequest: null,
                isLogged: false,
            },
        };

        const { findByRole } = renderWithProviders(
            <ProductByIdContainer id='mdf34ghj23' />,
            {
                preloadedState: initialState,
            }
        );

        expect(await waitFor(() => findByRole('heading'))).toHaveTextContent(
            'Bose QuietComfort 45'
        );

        const addButton = await waitFor(() =>
            findByRole('button', { name: 'Добавить' })
        );
        expect(addButton).toBeInTheDocument();
    });

    test('add product to cart without authentication', async () => {
        const initialState = {
            userInfo: {
                userInfo: null,
                tokens: null,
                cart: {},
                authRequestStatus: null,
                cartRequest: null,
                isLogged: false,
            },
        };

        const user = userEvent.setup();

        const id = 'mdf34ghj23';
        const { findByRole } = renderWithProviders(
            <ProductByIdContainer id={id} />,
            {
                preloadedState: initialState,
            }
        );

        const addButton = await waitFor(() =>
            findByRole('button', { name: 'Добавить' })
        );
        expect(addButton).toBeInTheDocument();
        await user.click(addButton);
        expect(addButton).toBeInTheDocument();
        expect(selectCartItemById(initialState, id)).toEqual(0);
    });

    test('add product to cart with authentication', async () => {
        const initialState = {
            userInfo: {
                userInfo: { email: 'email' },
                tokens: { accessToken: 'access', refreshToken: 'refresh' },
                cart: {},
                authRequestStatus: null,
                cartRequest: null,
                isLogged: true,
            },
        };

        const user = userEvent.setup();

        const id = 'mdf34ghj23';
        const { findByRole, store } = renderWithProviders(
            <ProductByIdContainer id={id} />,
            {
                preloadedState: initialState,
            }
        );

        expect(selectCartItemById(store.getState(), id)).toEqual(0);

        const addButton = await waitFor(() =>
            findByRole('button', { name: 'Добавить' })
        );
        expect(addButton).toBeInTheDocument();
        await user.click(addButton);
        expect(addButton).not.toBeInTheDocument();
        expect(selectCartItemById(store.getState(), id)).toEqual(1);
        expect(await waitFor(() => findByRole('textbox'))).toHaveValue('1');
    });

    test('add one more product to cart', async () => {
        const id = 'fdaassdc21';
        const initialState = {
            userInfo: {
                userInfo: { email: 'email' },
                tokens: { accessToken: 'access', refreshToken: 'refresh' },
                cart: { fdaassdc21: 1 },
                authRequestStatus: null,
                cartRequest: null,
                isLogged: true,
            },
        };

        const user = userEvent.setup();

        const { findByRole, store } = renderWithProviders(
            <ProductByIdContainer id={id} />,
            {
                preloadedState: initialState,
            }
        );

        expect(selectCartItemById(store.getState(), id)).toEqual(1);

        const addButton = await waitFor(() =>
            findByRole('button', { name: 'plus button' })
        );
        const totalInput = await waitFor(() => findByRole('textbox'));
        expect(totalInput).toBeInTheDocument();
        expect(totalInput).toHaveValue('1');
        expect(addButton).toBeInTheDocument();
        await user.click(addButton);
        expect(selectCartItemById(store.getState(), id)).toEqual(2);
        expect(totalInput).toHaveValue('2');
    });

    test('remove one piece of product from cart', async () => {
        const id = 'ghsyt234as';
        const initialState = {
            userInfo: {
                userInfo: { email: 'email' },
                tokens: { accessToken: 'access', refreshToken: 'refresh' },
                cart: { ghsyt234as: 2 },
                authRequestStatus: null,
                cartRequest: null,
                isLogged: true,
            },
        };

        const user = userEvent.setup();

        const { findByRole, store } = renderWithProviders(
            <ProductByIdContainer id={id} />,
            {
                preloadedState: initialState,
            }
        );

        expect(selectCartItemById(store.getState(), id)).toEqual(2);
        const totalInput = await waitFor(() => findByRole('textbox'));
        expect(totalInput).toBeInTheDocument();
        expect(totalInput).toHaveValue('2');
        const removeButton = await waitFor(() =>
            findByRole('button', { name: 'minus button' })
        );
        expect(removeButton).toBeInTheDocument();
        await user.click(removeButton);
        expect(selectCartItemById(store.getState(), id)).toEqual(1);
        expect(totalInput).toHaveValue('1');
    });

    test('remove product from cart', async () => {
        const id = 'fdaassdc21';
        const initialState = {
            userInfo: {
                userInfo: { email: 'email' },
                tokens: { accessToken: 'access', refreshToken: 'refresh' },
                cart: { fdaassdc21: 1 },
                authRequestStatus: null,
                cartRequest: null,
                isLogged: true,
            },
        };

        const user = userEvent.setup();

        const { findByRole, store } = renderWithProviders(
            <ProductByIdContainer id={id} />,
            {
                preloadedState: initialState,
            }
        );

        expect(selectCartItemById(store.getState(), id)).toEqual(1);
        const totalInput = await waitFor(() => findByRole('textbox'));
        expect(totalInput).toBeInTheDocument();
        expect(totalInput).toHaveValue('1');
        const removeButton = await waitFor(() =>
            findByRole('button', { name: 'minus button' })
        );
        expect(removeButton).toBeInTheDocument();
        await user.click(removeButton);
        expect(selectCartItemById(store.getState(), id)).toEqual(0);
        expect(totalInput).not.toBeInTheDocument();
        expect(
            await waitFor(() => findByRole('button', { name: 'Добавить' }))
        ).toBeInTheDocument();
    });
});
