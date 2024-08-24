import { CartItemsContainer } from '@/components/cart/container';
import { ErrorMessage } from '@/components/error/component';
// import { CartItemsContainer } from '@/components/cart/container';
import { RootState } from '@/store';
import { isUserLogged } from '@/store/user';
import { WithAuthorization } from '@/uikit/withAuthorization/component';
import { useSelector } from 'react-redux';

export const CartPage = () => {
    const isLogged = useSelector((state: RootState) => isUserLogged(state));

    return (
        <div>
            <WithAuthorization
                isLogged={isLogged}
                authorized={<CartItemsContainer />}
                notAuthorized={
                    <ErrorMessage
                        header='Вы ещё не авторизованы!'
                        description='Для просмотра корзины необходимо войти в аккаунт'
                    />
                }
            />
        </div>
    );
};
