import { FunctionComponent } from 'react';
import { Input } from '../input/conponent';
import style from './style.module.scss';
import { MinusButton, PlusButton } from '../button/templates';
import classNames from 'classnames';

const WIDTH = '142px';

type Props = {
    initialValue: number;
    className?: string;
    disabled?: boolean;
    width?: string;
    size?: 'normal' | 'xl';
    onAdd: () => void;
    onDelete: () => void;
};

export const Counter: FunctionComponent<Props> = ({
    initialValue,
    onAdd,
    onDelete,
    disabled,
    width,
    size,
    className,
}) => {
    return (
        <div
            className={
                className ? classNames(style.counter, className) : style.counter
            }
            style={{ width: width ?? WIDTH }}
        >
            <MinusButton
                disabled={disabled}
                onClick={onDelete}
                size={size}
            />
            <Input
                disabled={disabled}
                value={initialValue}
                align='center'
                inputSize={size}
                readOnly
            />
            <PlusButton
                size={size}
                disabled={disabled}
                onClick={onAdd}
            />
        </div>
    );
};
