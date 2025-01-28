"use client";
import { useEffect, useState } from "react";
import { setMode, setTemplateData } from "@/store/templateSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { FullPageLoader } from "@/components/Loader";
import { getPortfolioData } from "@/apis/getPortfolio";
import { selectUser } from "@/store/userSlice";
import { templateNames } from "@/utils/helper";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const dispatch = useDispatch();
    const pathname = usePathname();

    const user = useSelector(selectUser);

    const [initializingTemplate, setInitializingTemplate] = useState<boolean>(true);

    const initializeTemplate = async () => {
        setInitializingTemplate(true);
        if (!pathname || !user?.id) return;

        if (pathname.includes("basic1template")) {
            const { data, error } = await getPortfolioData(user.id, templateNames.Basic1Template);

            if (data) {
                if (data.page_title) document.title = data.page_title;
                if (data.page_description) document.querySelector("meta[name='description']")?.setAttribute("content", data.page_description);
                dispatch(setTemplateData({
                    type: "basic1template",
                    data: data.data
                }));
                dispatch(setMode("editing"));
            } else {
                dispatch(setMode("checking"));
            }
        } else if (pathname.includes("basic2template")) {
            const { data, error } = await getPortfolioData(user.id, templateNames.Basic2Template);

            if (data) {
                if (data.page_title) document.title = data.page_title;
                if (data.page_description) document.querySelector("meta[name='description']")?.setAttribute("content", data.page_description);
                dispatch(setTemplateData({
                    type: "basic2template",
                    data: data.data
                }));
                dispatch(setMode("editing"));
            } else {
                dispatch(setMode("checking"));
            }
        }

        setInitializingTemplate(false);
    };

    useEffect(() => {
        initializeTemplate();
    }, [pathname, user]);

    if (initializingTemplate) return <FullPageLoader />;

    return children;
};
