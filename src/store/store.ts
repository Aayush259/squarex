import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import templateReducer from './templateSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        template: templateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;