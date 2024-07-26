import {
    FunctionComponent,
    MouseEventHandler,
    PropsWithChildren,
    ReactNode,
} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';
import classNames from 'classnames';

export type MenuItemProps = {
    href: string;
    icon: () => ReactNode;
    onClick: MouseEventHandler<HTMLAnchorElement>;
};

export const MenuItem: FunctionComponent<PropsWithChildren<MenuItemProps>> = ({
    children,
    href,
    icon,
    onClick,
}) => {
    return (
        <NavLink
            onClick={onClick}
            className={({ isActive }) =>
                classNames(
                    'h5',
                    styles['navbar-item'],
                    isActive
                        ? styles['navbar-item_active']
                        : styles['navbar-item_inactive']
                )
            }
            to={href}
        >
            {icon()}
            {children}
        </NavLink>
    );
};
