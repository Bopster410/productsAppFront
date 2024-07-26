import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/main/page';
import { AboutPage } from './pages/about/page';
import { CartPage } from './pages/cart/page';
import { Layout } from './components/layout/component';
import { ProductPage } from './pages/product/page';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <div>Error 404</div>,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: 'cart',
                element: <CartPage />,
            },
            {
                path: 'product/:id',
                element: <ProductPage />,
            },
        ],
    },
    {
        path: 'about',
        element: <AboutPage />,
    },
]);
