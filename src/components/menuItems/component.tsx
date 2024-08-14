import { FunctionComponent, ReactNode } from 'react';
import { MenuItem } from '../menuItem/component';
import { List } from '@/uikit/list/component';

type Props = {
    items: { name: string; href: string; icon: () => ReactNode }[];
    onLinkClick?: () => void;
};

export const MenuItems: FunctionComponent<Props> = ({ items, onLinkClick }) => {
    return (
        <List
            items={items.map(({ href, name, icon }) => () => ({
                key: href,
                node: (
                    <MenuItem
                        onClick={() => {
                            if (!onLinkClick) return;

                            onLinkClick();
                        }}
                        href={href}
                        icon={icon}
                    >
                        {name}
                    </MenuItem>
                ),
            }))}
        />
    );
};
