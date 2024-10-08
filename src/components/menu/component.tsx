import { FunctionComponent } from 'react';
import { MenuButton } from '@/uikit/button/templates';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { MenuItems } from '../menuItems/component';
import style from './style.module.scss';
import { useDropdown } from '@/hooks/useDropdown';

const items = [
    {
        href: '/',
        name: 'Каталог',
        icon: () => (
            <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M9.6 13.2H1.2C0.88174 13.2 0.576515 13.3264 0.351472 13.5515C0.126428 13.7765 0 14.0817 0 14.4V22.8C0 23.1183 0.126428 23.4235 0.351472 23.6485C0.576515 23.8736 0.88174 24 1.2 24H9.6C9.91826 24 10.2235 23.8736 10.4485 23.6485C10.6736 23.4235 10.8 23.1183 10.8 22.8V14.4C10.8 14.0817 10.6736 13.7765 10.4485 13.5515C10.2235 13.3264 9.91826 13.2 9.6 13.2ZM8.4 21.6H2.4V15.6H8.4V21.6ZM22.8 0H14.4C14.0817 0 13.7765 0.126428 13.5515 0.351472C13.3264 0.576515 13.2 0.88174 13.2 1.2V9.6C13.2 9.91826 13.3264 10.2235 13.5515 10.4485C13.7765 10.6736 14.0817 10.8 14.4 10.8H22.8C23.1183 10.8 23.4235 10.6736 23.6485 10.4485C23.8736 10.2235 24 9.91826 24 9.6V1.2C24 0.88174 23.8736 0.576515 23.6485 0.351472C23.4235 0.126428 23.1183 0 22.8 0ZM21.6 8.4H15.6V2.4H21.6V8.4ZM22.8 13.2H14.4C14.0817 13.2 13.7765 13.3264 13.5515 13.5515C13.3264 13.7765 13.2 14.0817 13.2 14.4V22.8C13.2 23.1183 13.3264 23.4235 13.5515 23.6485C13.7765 23.8736 14.0817 24 14.4 24H22.8C23.1183 24 23.4235 23.8736 23.6485 23.6485C23.8736 23.4235 24 23.1183 24 22.8V14.4C24 14.0817 23.8736 13.7765 23.6485 13.5515C23.4235 13.3264 23.1183 13.2 22.8 13.2ZM21.6 21.6H15.6V15.6H21.6V21.6ZM9.6 0H1.2C0.88174 0 0.576515 0.126428 0.351472 0.351472C0.126428 0.576515 0 0.88174 0 1.2V9.6C0 9.91826 0.126428 10.2235 0.351472 10.4485C0.576515 10.6736 0.88174 10.8 1.2 10.8H9.6C9.91826 10.8 10.2235 10.6736 10.4485 10.4485C10.6736 10.2235 10.8 9.91826 10.8 9.6V1.2C10.8 0.88174 10.6736 0.576515 10.4485 0.351472C10.2235 0.126428 9.91826 0 9.6 0ZM8.4 8.4H2.4V2.4H8.4V8.4Z'
                    fill='currentColor'
                />
            </svg>
        ),
    },
    {
        href: '/cart',
        name: 'Корзина',
        icon: () => (
            <svg
                width='24'
                height='30'
                viewBox='0 0 24 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M22.5 7.5H18V6C18 4.4087 17.3679 2.88258 16.2426 1.75736C15.1174 0.632141 13.5913 0 12 0C10.4087 0 8.88258 0.632141 7.75736 1.75736C6.63214 2.88258 6 4.4087 6 6V7.5H1.5C1.10218 7.5 0.720645 7.65804 0.43934 7.93934C0.158036 8.22064 0 8.60218 0 9V25.5C0 26.6935 0.474106 27.8381 1.31802 28.682C2.16193 29.5259 3.30653 30 4.5 30H19.5C20.6935 30 21.8381 29.5259 22.682 28.682C23.5259 27.8381 24 26.6935 24 25.5V9C24 8.60218 23.842 8.22064 23.5607 7.93934C23.2794 7.65804 22.8978 7.5 22.5 7.5ZM9 6C9 5.20435 9.31607 4.44129 9.87868 3.87868C10.4413 3.31607 11.2044 3 12 3C12.7956 3 13.5587 3.31607 14.1213 3.87868C14.6839 4.44129 15 5.20435 15 6V7.5H9V6ZM21 25.5C21 25.8978 20.842 26.2794 20.5607 26.5607C20.2794 26.842 19.8978 27 19.5 27H4.5C4.10218 27 3.72064 26.842 3.43934 26.5607C3.15804 26.2794 3 25.8978 3 25.5V10.5H6V12C6 12.3978 6.15804 12.7794 6.43934 13.0607C6.72064 13.342 7.10218 13.5 7.5 13.5C7.89782 13.5 8.27936 13.342 8.56066 13.0607C8.84196 12.7794 9 12.3978 9 12V10.5H15V12C15 12.3978 15.158 12.7794 15.4393 13.0607C15.7206 13.342 16.1022 13.5 16.5 13.5C16.8978 13.5 17.2794 13.342 17.5607 13.0607C17.842 12.7794 18 12.3978 18 12V10.5H21V25.5Z'
                    fill='currentColor'
                />
            </svg>
        ),
    },
];

const variants: Variants = {
    opened: {
        clipPath: 'inset(-10% -10% -10% -10% round var(--border-radius-sm))',
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.4,
        },
    },
    closed: {
        clipPath: 'inset(10% 100% 100% 10% round var(--border-radius-sm))',
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.4,
        },
    },
};

export const Menu: FunctionComponent = () => {
    const { dropdownRef, isShown, hide, toggle } = useDropdown();
    return (
        <motion.div>
            <MenuButton
                isShown={isShown}
                color='white'
                onClick={(event) => {
                    event.stopPropagation();
                    toggle();
                }}
            />
            <AnimatePresence>
                {isShown && (
                    <motion.div
                        variants={variants}
                        initial='closed'
                        animate='opened'
                        exit='closed'
                        ref={dropdownRef}
                        className={style['menu-items-container']}
                    >
                        <MenuItems
                            items={items}
                            onLinkClick={hide}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
