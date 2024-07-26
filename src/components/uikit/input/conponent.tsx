import { FunctionComponent } from 'react';
import styles from './style.module.scss';
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    inputData?: 'number' | 'string';
}

export const Input: FunctionComponent<Props> = (props) => {
    return (
        <input
            {...props}
            className={styles.input}
            type='text'
            value={props.value}
        />
    );
};
