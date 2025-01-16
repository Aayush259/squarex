"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const dispatch = useDispatch();
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            if (session.user.id) {
                dispatch(setUser({
                    id: session.user.id,
                    name: session.user.name || '',
                    email: session.user.email || '',
                }));
            }
        }
    }, [session, dispatch]);

    return children;
};
