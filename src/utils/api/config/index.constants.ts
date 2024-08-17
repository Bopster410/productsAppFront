import { config } from '@/config';
const { mode } = config;

const BACKEND_DOMAIN = 'productsapp-54xs.onrender.com/api';

export const BACKEND_URL =
    mode === 'development'
        ? 'http://localhost:3030/api'
        : 'https://' + BACKEND_DOMAIN;
