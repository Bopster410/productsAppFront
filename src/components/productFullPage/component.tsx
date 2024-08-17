import { FunctionComponent } from 'react';
import styles from './style.module.scss';
import placeholderUrl from '@/components/product/placeholder.jpg';
import classNames from 'classnames';
import { WithLoader } from '@/uikit/withLoader/component';
import { Counter } from '@/uikit/counter/component';
import { Button } from '@/uikit/button/component';
import { ShortenContent } from '@/uikit/shortenContent/component';

type Props = {
    id: string;
    name: string;
    totalInCart: number;
    rating: number;
    price: number;
    totalComments: number;
    description: string;
    isLoading?: boolean;
    onAdd: () => void;
    onDelete: () => void;
};

export const ProductFullPage: FunctionComponent<Props> = ({
    name,
    description,
    rating,
    totalComments,
    isLoading,
    totalInCart,
    price,
    onAdd,
    onDelete,
}) => {
    return (
        <div className={styles.product}>
            <div className={styles['main-info']}>
                <div>
                    <img
                        className={styles['product-image']}
                        src={placeholderUrl}
                        alt='product image'
                    />
                </div>
                <div className={styles['product-info-container']}>
                    <div className={classNames('h4')}>{name}</div>
                    <div className={classNames(styles['product-rating'], 'h6')}>
                        <span className={styles['product-rating-item']}>
                            <svg
                                width='21'
                                height='20'
                                viewBox='0 0 21 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M9.35285 0.630377C9.46463 0.438572 9.62474 0.279428 9.81722 0.168818C10.0097 0.0582081 10.2278 0 10.4498 0C10.6718 0 10.8899 0.0582081 11.0824 0.168818C11.2749 0.279428 11.435 0.438572 11.5468 0.630377L14.3856 5.50369L19.8988 6.69815C20.1157 6.74527 20.3164 6.84842 20.481 6.9973C20.6456 7.14619 20.7682 7.33561 20.8368 7.54668C20.9053 7.75776 20.9173 7.98311 20.8716 8.20028C20.8259 8.41745 20.7241 8.61884 20.5763 8.78439L16.8182 12.9904L17.387 18.6021C17.4095 18.8231 17.3735 19.0461 17.2828 19.2488C17.1921 19.4516 17.0498 19.627 16.8702 19.7575C16.6905 19.8881 16.4797 19.9692 16.2588 19.9928C16.038 20.0164 15.8148 19.9817 15.6116 19.892L10.4498 17.6169L5.28804 19.892C5.08482 19.9817 4.86164 20.0164 4.64079 19.9928C4.41994 19.9692 4.20915 19.8881 4.02946 19.7575C3.84977 19.627 3.70747 19.4516 3.61678 19.2488C3.52608 19.0461 3.49016 18.8231 3.5126 18.6021L4.08139 12.9904L0.323312 8.7854C0.175251 8.61987 0.0732019 8.4184 0.0273517 8.20109C-0.0184986 7.98379 -0.00654562 7.75826 0.0620172 7.54702C0.13058 7.33578 0.253354 7.14622 0.418082 6.99727C0.58281 6.84831 0.78373 6.74517 1.00078 6.69815L6.51398 5.50369L9.35285 0.630377ZM10.4498 2.78264L8.1005 6.81698C8.01167 6.96926 7.8921 7.10137 7.7494 7.20489C7.60671 7.30841 7.44402 7.38108 7.27169 7.41828L2.70918 8.40655L5.81925 11.8873C6.05692 12.1535 6.17169 12.5069 6.13614 12.8614L5.66588 17.5062L9.9379 15.6231C10.0992 15.552 10.2735 15.5153 10.4498 15.5153C10.6261 15.5153 10.8004 15.552 10.9617 15.6231L15.2337 17.5062L14.7635 12.8614C14.7456 12.686 14.7645 12.5088 14.8189 12.3411C14.8732 12.1734 14.962 12.0189 15.0794 11.8873L18.1904 8.40655L13.6279 7.41828C13.4556 7.38108 13.2929 7.30841 13.1502 7.20489C13.0075 7.10137 12.8879 6.96926 12.7991 6.81698L10.4498 2.78264Z'
                                    fill='currentColor'
                                />
                            </svg>
                            {rating}
                        </span>
                        <span className={styles['product-rating-item']}>
                            <svg
                                width='21'
                                height='20'
                                viewBox='0 0 21 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M0.898926 2.50034C0.898926 1.12015 2.01908 0 3.39927 0H18.4013C19.7815 0 20.9017 1.12015 20.9017 2.50034V13.2161C20.9017 13.8792 20.6382 14.5152 20.1693 14.9841C19.7004 15.453 19.0645 15.7164 18.4013 15.7164H12.4148L8.73857 19.3927C8.44718 19.6829 8.07636 19.8805 7.67288 19.9603C7.26939 20.0402 6.85129 19.9989 6.47128 19.8415C6.09127 19.6841 5.76635 19.4177 5.53748 19.076C5.30862 18.7342 5.18605 18.3323 5.18523 17.921V15.7164H3.39927C2.73614 15.7164 2.10016 15.453 1.63126 14.9841C1.16235 14.5152 0.898926 13.8792 0.898926 13.2161V2.50034ZM3.39927 2.14315C3.30454 2.14315 3.21368 2.18078 3.1467 2.24777C3.07971 2.31476 3.04208 2.40561 3.04208 2.50034V13.2161C3.04208 13.4133 3.2021 13.5733 3.39927 13.5733H6.2568C6.541 13.5733 6.81356 13.6862 7.01452 13.8871C7.21548 14.0881 7.32838 14.3607 7.32838 14.6449V17.7739L11.2146 13.8876C11.4154 13.6866 11.6878 13.5735 11.9719 13.5733H18.4013C18.4961 13.5733 18.5869 13.5357 18.6539 13.4687C18.7209 13.4017 18.7585 13.3108 18.7585 13.2161V2.50034C18.7585 2.40561 18.7209 2.31476 18.6539 2.24777C18.5869 2.18078 18.4961 2.14315 18.4013 2.14315H3.39927Z'
                                    fill='currentColor'
                                />
                            </svg>
                            {totalComments}
                        </span>
                    </div>
                    <ShortenContent maxHeight={216}>
                        <div className={classNames('p-xl')}>{description}</div>
                    </ShortenContent>
                </div>
            </div>
            <div className={styles['counter-container']}>
                <div className={classNames(styles['product-price'], 'h3')}>
                    {price} ₽
                </div>
                <WithLoader isLoading={isLoading ?? false}>
                    {totalInCart > 0 ? (
                        <Counter
                            disabled={isLoading}
                            onAdd={onAdd}
                            onDelete={onDelete}
                            initialValue={totalInCart}
                            width='228px'
                            size='xl'
                        />
                    ) : (
                        <Button
                            disabled={isLoading}
                            onClick={onAdd}
                            color='primary'
                            width='228px'
                            size='xl'
                        >
                            Добавить
                        </Button>
                    )}
                </WithLoader>
                <div
                    className={classNames(
                        styles['product-delivery'],
                        'text-secondary'
                    )}
                >
                    доставка послезавтра
                </div>
            </div>
        </div>
    );
};
