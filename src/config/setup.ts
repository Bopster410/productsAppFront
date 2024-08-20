import { config } from '.';

if (config.mode === 'production') {
    console.log = () => {};
}
