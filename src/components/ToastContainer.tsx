"use client";
import { useDispatch, useSelector } from "react-redux";
import { removeToast, selectToast } from "@/store/toastSlice";
import Toast from "./Toast";

const ToastContainer = () => {

    const { toasts } = useSelector(selectToast);
    const dispatch = useDispatch();

    return (
        <div className="w-screen fixed top-5 left-0 z-[999] flex flex-col duration-500 h-fit items-center">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    success={toast.success}
                    onClose={() => dispatch(removeToast(toast.id))}
                />
            ))}
        </div>
    );
};

export default ToastContainer;
