import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import templateReducer from './templateSlice';
import toastReducer from './toastSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        template: templateReducer,
        toast: toastReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;