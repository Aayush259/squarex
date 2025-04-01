import { IToast } from "@/utils/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
    toasts: IToast[];
}

const initialState: ToastState = {
    toasts: [],
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<{ message: string; success: boolean }>) => {
            const id = Math.random().toString(36).slice(2, 11);
            state.toasts.push({ id, ...action.payload });
        },
        removeToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
        },
    },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
