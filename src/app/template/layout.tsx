"use client";
import { useEffect, useState } from "react";
import { setMode, setTemplateData } from "@/store/templateSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { FullPageLoader } from "@/components/Loader";
import { getPortfolioWithBasic1Template } from "@/apis/getPortfolio";
import { selectUser } from "@/store/userSlice";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const dispatch = useDispatch();
    const pathname = usePathname();

    const user = useSelector(selectUser);

    const [initializingTemplate, setInitializingTemplate] = useState<boolean>(true);

    const initializeTemplate = async () => {
        setInitializingTemplate(true);
        if (!pathname || !user?.id) return;

        if (pathname.includes("basic1template")) {
            const { data, error } = await getPortfolioWithBasic1Template(user.id);

            if (data) {
                if (data.page_title) document.title = data.page_title;
                if (data.page_description) document.querySelector("meta[name='description']")?.setAttribute("content", data.page_description);
                dispatch(setTemplateData({
                    basic1template: data.data
                }));
            }
        }

        setInitializingTemplate(false);
        dispatch(setMode("editing"));
    };

    useEffect(() => {
        initializeTemplate();
    }, [pathname, user]);

    if (initializingTemplate) return <FullPageLoader />;

    return children;
};
