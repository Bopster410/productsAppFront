import { FunctionComponent } from 'react';
import { Counter } from '../uikit/counter/component';
import styles from './style.module.scss';
import placeholderUrl from './placeholder.jpg';
import classNames from 'classnames';
import { Clamper } from '../uikit/clamper/component';
import { LinkCustom } from '../uikit/link/component';
import { motion } from 'framer-motion';
import { shortenNumber } from '../../utils/shortenNumber';
import { Button } from '../uikit/button/component';
import { WithLoader } from '../uikit/withLoader/component';

type Props = {
    id: string;
    name: string;
    totalInCart: number;
    rating: number;
    price: number;
    totalComments: number;
    isLoading?: boolean;
    onAdd: () => void;
    onDelete: () => void;
};

export type { Props as ProductProps };

export const Product: FunctionComponent<Props> = ({
    id,
    name,
    totalInCart,
    totalComments,
    rating,
    onAdd,
    onDelete,
    price,
    isLoading,
}) => {
    const description =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique perspiciatis illum officia consectetur vero aperiam corporis quae facere blanditiis ullam quasi, voluptate cumque placeat, ipsum officiis repudiandae doloremque enim? Modi!Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique perspiciatis illum officia consectetur vero aperiam corporis quae facere blanditiis ullam quasi, voluptate cumque placeat, ipsum officiis repudiandae doloremque enim? Modi!';
    return (
        <motion.div
            whileHover={{ scale: 1.01, boxShadow: 'var(--shadow)' }}
            transition={{ duration: 0.1 }}
            className={styles['product-card']}
        >
            <img
                className={styles['product-image']}
                src={placeholderUrl}
                alt='product image'
            />
            <div className={classNames(styles['product-header'], 'h5')}>
                <LinkCustom to={`/product/${id}`}>
                    <Clamper maxLines={1}>{name}</Clamper>
                </LinkCustom>
                <div className={classNames(styles['product-price'], 'h4')}>
                    {price} ₽
                </div>
            </div>
            <div className={classNames('p', styles['product-description'])}>
                <Clamper maxLines={3}>{description}</Clamper>
            </div>
            <div className={classNames(styles['product-meta'], 'p-b')}>
                <span className={styles['product-meta-item']}>
                    <svg
                        width='17'
                        height='16'
                        viewBox='0 0 17 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M7.48228 0.504302C7.5717 0.350858 7.69979 0.223542 7.85377 0.135054C8.00775 0.0465665 8.18225 0 8.35984 0C8.53744 0 8.71193 0.0465665 8.86592 0.135054C9.0199 0.223542 9.14799 0.350858 9.23741 0.504302L11.5085 4.40295L15.9191 5.35852C16.0926 5.39622 16.2531 5.47874 16.3848 5.59784C16.5165 5.71695 16.6146 5.86849 16.6694 6.03735C16.7243 6.20621 16.7339 6.38649 16.6973 6.56023C16.6607 6.73396 16.5793 6.89508 16.461 7.02751L13.4546 10.3923L13.9096 14.8817C13.9276 15.0585 13.8988 15.2369 13.8263 15.3991C13.7537 15.5613 13.6399 15.7016 13.4961 15.806C13.3524 15.9105 13.1837 15.9754 13.0071 15.9942C12.8304 16.0131 12.6518 15.9853 12.4893 15.9136L8.35984 14.0935L4.23043 15.9136C4.06785 15.9853 3.88931 16.0131 3.71263 15.9942C3.53595 15.9754 3.36732 15.9105 3.22357 15.806C3.07982 15.7016 2.96598 15.5613 2.89342 15.3991C2.82087 15.2369 2.79213 15.0585 2.81008 14.8817L3.26511 10.3923L0.258649 7.02832C0.140201 6.8959 0.0585615 6.73472 0.0218813 6.56088C-0.0147989 6.38703 -0.0052365 6.20661 0.0496138 6.03762C0.104464 5.86863 0.202683 5.71698 0.334466 5.59782C0.466248 5.47865 0.626984 5.39614 0.800625 5.35852L5.21119 4.40295L7.48228 0.504302ZM8.35984 2.22611L6.4804 5.45359C6.40933 5.57541 6.31368 5.68109 6.19952 5.76391C6.08537 5.84673 5.95521 5.90487 5.81735 5.93462L2.16735 6.72524L4.6554 9.50987C4.84553 9.72276 4.93735 10.0055 4.90891 10.2891L4.5327 14.0049L7.95032 12.4985C8.07936 12.4416 8.21883 12.4122 8.35984 12.4122C8.50086 12.4122 8.64033 12.4416 8.76937 12.4985L12.187 14.0049L11.8108 10.2891C11.7965 10.1488 11.8116 10.007 11.8551 9.87289C11.8986 9.73873 11.9696 9.6151 12.0635 9.50987L14.5523 6.72524L10.9023 5.93462C10.7645 5.90487 10.6343 5.84673 10.5202 5.76391C10.406 5.68109 10.3104 5.57541 10.2393 5.45359L8.35984 2.22611Z'
                            fill='currentColor'
                        />
                    </svg>
                    {rating}
                </span>
                <span className={styles['product-meta-item']}>
                    <svg
                        width='17'
                        height='16'
                        viewBox='0 0 17 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M0.719086 2.00027C0.719086 0.896123 1.61521 0 2.71936 0H14.721C15.8252 0 16.7213 0.896123 16.7213 2.00027V10.5729C16.7213 11.1034 16.5105 11.6122 16.1354 11.9873C15.7603 12.3624 15.2515 12.5731 14.721 12.5731H9.93178L6.9908 15.5141C6.75769 15.7464 6.46104 15.9044 6.13825 15.9683C5.81546 16.0322 5.48098 15.9991 5.17697 15.8732C4.87296 15.7473 4.61302 15.5342 4.42993 15.2608C4.24684 14.9874 4.14879 14.6659 4.14813 14.3368V12.5731H2.71936C2.18885 12.5731 1.68008 12.3624 1.30495 11.9873C0.929828 11.6122 0.719086 11.1034 0.719086 10.5729V2.00027ZM2.71936 1.71452C2.64357 1.71452 2.57089 1.74463 2.5173 1.79822C2.46371 1.8518 2.43361 1.92449 2.43361 2.00027V10.5729C2.43361 10.7306 2.56162 10.8586 2.71936 10.8586H5.00539C5.23275 10.8586 5.45079 10.9489 5.61156 11.1097C5.77233 11.2705 5.86265 11.4885 5.86265 11.7159V14.2191L8.97165 11.1101C9.13226 10.9493 9.35016 10.8588 9.57744 10.8586H14.721C14.7968 10.8586 14.8695 10.8285 14.9231 10.7749C14.9767 10.7213 15.0068 10.6487 15.0068 10.5729V2.00027C15.0068 1.92449 14.9767 1.8518 14.9231 1.79822C14.8695 1.74463 14.7968 1.71452 14.721 1.71452H2.71936Z'
                            fill='currentColor'
                        />
                    </svg>
                    {shortenNumber(totalComments)}
                </span>
            </div>
            <div className={styles['product-counter']}>
                <WithLoader isLoading={isLoading ?? false}>
                    {totalInCart > 0 ? (
                        <Counter
                            disabled={isLoading}
                            onAdd={onAdd}
                            onDelete={onDelete}
                            initialValue={totalInCart}
                        />
                    ) : (
                        <Button
                            disabled={isLoading}
                            onClick={onAdd}
                            color='primary'
                        >
                            Добавить
                        </Button>
                    )}
                </WithLoader>
            </div>
        </motion.div>
    );
};
