import { expect, afterEach } from 'vitest';
import { cleanup, render, RenderOptions } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { AppStore, Indexed, RootState, setupStore } from '@/store';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { BACKEND_URL } from '@/utils/api/config/index.constants';

expect.extend(matchers);

afterEach(() => {
    cleanup();
});

// Extended render options with preloaded state and store for redux
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

// Render function with all necessary providers
export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
) {
    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions;

    const Wrapper = ({ children }: PropsWithChildren) => (
        <BrowserRouter>
            <Provider store={store}>{children}</Provider>
        </BrowserRouter>
    );

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}

// Mockup server setup
const handlers = [
    http.get(`${BACKEND_URL}/products/:id`, () => {
        return HttpResponse.json({
            productId: 'mdf34ghj23',
            name: 'Bose QuietComfort 45',
            price: 27990,
            description:
                'Bose QuietComfort 45 — это премиум-наушники, обеспечивающие исключительное качество звука и передовое активное шумоподавление. Они оснащены новыми динамиками, которые создают яркое и детализированное звучание, а также системой активного шумоподавления, которая эффективно блокирует внешние звуки и позволяет сосредоточиться на музыке или разговорах. Наушники имеют два режима активного шумоподавления: максимальный для полной изоляции и «Окружающий» для прослушивания окружающих звуков при необходимости. Комфортные амбушюры с мягким наполнителем и регулируемое оголовье гарантируют удобное ношение даже в течение длительного времени. Bose QuietComfort 45 поддерживают Bluetooth и NFC для удобного подключения к устройствам, а также имеют встроенный микрофон для качественных звонков. Время работы на одном заряде составляет до 24 часов, что позволяет использовать их в течение целого дня. Вдобавок, они поддерживают быструю зарядку, которая позволяет получить до 3 часов воспроизведения всего за 15 минут зарядки.',
            rating: 4.7,
            totalComments: 900,
        });
    }),
    http.post(`${BACKEND_URL}/auth/login`, () => {
        return HttpResponse.json({
            accessToken: 'access',
            refreshToken: 'refresh',
            cart: [],
        });
    }),
    http.post(`${BACKEND_URL}/users/cart/add`, async ({ request }) => {
        const cart: Indexed<number> = {
            mdf34ghj23: 1,
            fdaassdc21: 2,
        };
        const product = (await request.json()) as { productId: string };

        return HttpResponse.json({ total: cart[product.productId] ?? 0 });
    }),
    http.post(`${BACKEND_URL}/users/cart/remove`, async ({ request }) => {
        const cart: Indexed<number> = {
            fdaassdc21: 0,
            ghsyt234as: 1,
        };
        const product = (await request.json()) as { productId: string };

        return HttpResponse.json({ total: cart[product.productId] ?? 0 });
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
