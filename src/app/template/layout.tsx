"use client";
import { useEffect, useState } from "react";
import { selectTemplateMode, setMode, setTemplateData } from "@/store/templateSlice";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { FullPageLoader } from "@/components/Loader";
import { getPortfolioWithBasic1Template } from "@/apis/getPortfolio";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const dispatch = useDispatch();
    const pathname = usePathname();
    const { data: session } = useSession();

    const templateMode = useSelector(selectTemplateMode);

    const initializeTemplate = async () => {
        if (!pathname || !session?.user?.id) return;

        if (pathname.includes("basic1template")) {
            const { data, error } = await getPortfolioWithBasic1Template(session.user.id);

            if (data) {
                dispatch(setTemplateData({
                    basic1template: data.data
                }));
            }
        }

        dispatch(setMode("editing"));
    };

    useEffect(() => {
        initializeTemplate();
    }, [pathname, session]);

    if (!session?.user?.id || !templateMode) return <FullPageLoader />;

    return children;
};
