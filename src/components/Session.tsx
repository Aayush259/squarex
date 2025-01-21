"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/store/userSlice";
import { FullPageLoader } from "./Loader";

export default function Session({ children }: Readonly<{ children: React.ReactNode }>) {

    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (status === "loading") {
            setLoading(true);
        } else {
            setLoading(false);
        }

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

    if (!user && loading) return <FullPageLoader />;

    return children;
};
