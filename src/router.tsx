import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/main/page';
import { AboutPage } from './pages/about/page';
import { CartPage } from './pages/cart/page';
import { Layout } from './components/layout/component';
import { ProductPage } from './pages/product/page';
import { productPageLoader } from './pages/product';
import { mainPageLoader } from './pages/main';
import { ErrorBoundary } from './components/errorBoundary/component';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                errorElement: <ErrorBoundary />,
                path: '/',
                children: [
                    {
                        index: true,
                        element: <MainPage />,
                        loader: mainPageLoader,
                    },
                    {
                        path: 'cart',
                        element: <CartPage />,
                    },
                    {
                        path: 'product/:id',
                        element: <ProductPage />,
                        loader: productPageLoader,
                    },
                ],
            },
        ],
    },
    {
        path: 'about',
        element: <AboutPage />,
    },
]);
