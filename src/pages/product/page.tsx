import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ProductByIdContainer } from '../../api/products/container';
import { ProductFullPage } from '@/components/productFullPage/component';
import { LinkBack } from '@/uikit/link/back';

export const ProductPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id === undefined) navigate('/');
    }, [id]);

    return (
        id && (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <span className='h6'>
                    <LinkBack
                        to='#'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: 'fit-content',
                        }}
                    >
                        <svg
                            width='9'
                            height='17'
                            viewBox='0 0 9 17'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M8.80056 1.80763L7.49169 0.5L0.362622 7.6266C0.247705 7.74079 0.156505 7.87658 0.094272 8.02616C0.0320386 8.17574 0 8.33614 0 8.49815C0 8.66016 0.0320386 8.82056 0.094272 8.97014C0.156505 9.11971 0.247705 9.25551 0.362622 9.3697L7.49169 16.5L8.79932 15.1924L2.10819 8.5L8.80056 1.80763Z'
                                fill='currentColor'
                            />
                        </svg>
                        назад
                    </LinkBack>
                </span>
                <ProductByIdContainer
                    ProductCard={ProductFullPage}
                    id={id}
                />
            </div>
        )
    );
};
