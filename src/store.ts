import { configureStore, Dispatch } from '@reduxjs/toolkit';
import { userInfoSlice } from './store/user';
import { useDispatch } from 'react-redux';

// Создание стора
export const store = configureStore({
    reducer: { userInfo: userInfoSlice.reducer },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
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
