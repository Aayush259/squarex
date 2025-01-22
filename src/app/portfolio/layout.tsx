"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMode } from "@/store/templateSlice";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMode("done"));
    }, [dispatch]);

    return children;
};
