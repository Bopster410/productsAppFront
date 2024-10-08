import { FunctionComponent } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    inputData?: 'number' | 'string';
    align?: 'left' | 'center';
    inputSize?: 'xl' | 'normal';
}

export const Input: FunctionComponent<Props> = ({
    type,
    value,
    align,
    inputSize,
    ...props
}) => {
    return (
        <input
            {...props}
            className={classNames(
                styles.input,
                align === 'center'
                    ? styles['input_align-center']
                    : styles['input_align-left'],
                styles[`input_${inputSize ?? 'normal'}`]
            )}
            type={type}
            value={value}
        />
    );
};

export type { Props as InputProps };
