import { useState, useEffect } from 'react';

export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        const offlineListener = () => setIsOnline(false);
        window.addEventListener('offline', offlineListener);
        const onlineListener = () => setIsOnline(true);
        window.addEventListener('online', onlineListener);

        return () => {
            window.removeEventListener('offline', offlineListener);
            window.removeEventListener('online', onlineListener);
        };
    }, []);

    return isOnline;
}
