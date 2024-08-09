import { FunctionComponent } from 'react';
import { Input } from '../input/conponent';
import style from './style.module.scss';
import { MinusButton, PlusButton } from '../button/templates';
import classNames from 'classnames';

type Props = {
    initialValue: number;
    className?: string;
    disabled?: boolean;
    onAdd: () => void;
    onDelete: () => void;
};

export const Counter: FunctionComponent<Props> = ({
    initialValue,
    onAdd,
    onDelete,
    disabled,
    className,
}) => {
    return (
        <div
            className={
                className ? classNames(style.counter, className) : style.counter
            }
        >
            <MinusButton
                disabled={disabled}
                onClick={onDelete}
            />
            <Input
                disabled={disabled}
                value={initialValue}
                align='center'
                readOnly
            />
            <PlusButton
                disabled={disabled}
                onClick={onAdd}
            />
        </div>
    );
};
