import dotenv from 'dotenv';
dotenv.config();

const MODE = process.env.DEPLOY_MODE;

const BACKEND_DOMAIN = 'productsapp-54xs.onrender.com/api';

export const BACKEND_URL =
    MODE === 'development'
        ? 'http://localhost:3030/api'
        : 'https://' + BACKEND_DOMAIN;
