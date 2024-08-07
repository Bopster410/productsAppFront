import { useCycle } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { isClickOut } from '../../utils/clickOut';

export function useDropdown() {
    const [isShown, toggleShown] = useCycle(false, true);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const isClickedOut = isClickOut(dropdownRef.current, event);
            if (isClickedOut) {
                toggleShown(0);
            }
        };

        if (isShown && dropdownRef.current)
            document.addEventListener('click', listener);

        return () => document.removeEventListener('click', listener);
    }, [isShown]);

    return {
        isShown,
        dropdownRef,
        show: () => toggleShown(1),
        hide: () => toggleShown(0),
        toggle: () => toggleShown(),
    };
}
