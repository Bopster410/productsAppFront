export function registerSW() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/sw.js', {
                    scope: '/',
                })
                .then((registration) => {
                    if (registration.installing) {
                        const data = {
                            type: 'CACHE_DATA',
                            payload: [
                                location.href,
                                ...performance
                                    .getEntriesByType('resource')
                                    .map((resourse) => resourse.name),
                            ],
                        };
                        console.log(data);
                        registration.installing.postMessage(data);
                    }
                })
                .catch(() => {});
        });
    }
}
