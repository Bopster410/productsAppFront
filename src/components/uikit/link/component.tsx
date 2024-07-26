import { FunctionComponent } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const LinkCustom: FunctionComponent<LinkProps> = ({
    children,
    ...props
}) => {
    return <Link {...props}>{children}</Link>;
};
