import { FunctionComponent } from 'react';
import { LinkCustom } from './component';
import { LinkProps } from 'react-router-dom';

export const LinkBack: FunctionComponent<LinkProps> = ({
    children,
    ...props
}) => {
    return (
        <LinkCustom
            onClick={(event) => {
                event.preventDefault();
                history.back();
            }}
            {...props}
        >
            {children}
        </LinkCustom>
    );
};
