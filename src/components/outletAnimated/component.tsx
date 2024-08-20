import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

export const OutletAnimated = () => {
    const location = useLocation();
    const element = useOutlet();

    return (
        <AnimatePresence
            mode='wait'
            initial={true}
        >
            {element && React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    );
};
