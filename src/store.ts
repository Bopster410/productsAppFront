import { combineReducers, configureStore, Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { userReducer } from './store/user/slice';

const rootReducer = combineReducers({ userInfo: userReducer });

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type Action<Payload = any> = { payload: Payload; type: string };
export type Indexed<T> = {
    [id: string]: T;
};
export type AsyncThunkConfig = {
    /** return type for `thunkApi.getState` */
    state?: unknown;
    /** type for `thunkApi.dispatch` */
    dispatch?: Dispatch;
    /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
    extra?: unknown;
    /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
    rejectValue?: unknown;
    /** return type of the `serializeError` option callback */
    serializedErrorType?: unknown;
    /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
    pendingMeta?: unknown;
    /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
    fulfilledMeta?: unknown;
    /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
    rejectedMeta?: unknown;
};
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Создание стора
export const store = setupStore();
