import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Counter } from '../uikit/counter/component';
import styles from './style.module.scss';
import placeholderUrl from './placeholder.jpg';
import classNames from 'classnames';
import { Clamper } from '../uikit/clamper/component';

type Props = {
    id: string;
    name: string;
    totalInCart: number;
    // rating: number;
    // price: number;
    // totalComments: number;
    onAdd: () => void;
    onDelete: () => void;
};

export type { Props as ProductProps };

export const Product: FunctionComponent<Props> = ({
    id,
    name,
    totalInCart,
    onAdd,
    onDelete,
}) => {
    const description =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique perspiciatis illum officia consectetur vero aperiam corporis quae facere blanditiis ullam quasi, voluptate cumque placeat, ipsum officiis repudiandae doloremque enim? Modi!Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique perspiciatis illum officia consectetur vero aperiam corporis quae facere blanditiis ullam quasi, voluptate cumque placeat, ipsum officiis repudiandae doloremque enim? Modi!';
    return (
        <div className={styles['product-card']}>
            <img
                className={styles['product-image']}
                src={placeholderUrl}
                alt='product image'
            />
            <Link
                className={classNames(styles['product-header'], 'h5')}
                to={`/product/${id}`}
            >
                {name}
            </Link>
            <div className={classNames('p', styles['product-description'])}>
                <Clamper maxLines={4}>{description}</Clamper>
            </div>
            <Counter
                className={styles['product-counter']}
                onAdd={onAdd}
                onDelete={onDelete}
                initialValue={totalInCart}
            />
        </div>
    );
};
