import { FunctionComponent } from 'react';
import { Input } from '../input/conponent';
import style from './style.module.scss';
import { MinusButton, PlusButton } from '../button/templates';
import classNames from 'classnames';

type Props = {
    initialValue: number;
    className?: string;
    onAdd: () => void;
    onDelete: () => void;
};

export const Counter: FunctionComponent<Props> = ({
    initialValue,
    onAdd,
    onDelete,
    className,
}) => {
    return (
        <div
            className={
                className ? classNames(style.counter, className) : style.counter
            }
        >
            <MinusButton onClick={onDelete} />
            <Input
                value={initialValue}
                align='center'
                readOnly
            />
            <PlusButton onClick={onAdd} />
        </div>
    );
};
