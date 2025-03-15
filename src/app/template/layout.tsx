"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { templateNames } from "@/utils/helper";
import { selectUser } from "@/store/userSlice";
import { setMode, setTemplateData } from "@/store/templateSlice";
import { FullPageLoader } from "@/components/Loader";
import { getPortfolioData } from "@/apis/getPortfolio";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const dispatch = useDispatch();
    const pathname = usePathname();

    const user = useSelector(selectUser);   // Get user from Redux store

    // State to track the template being initialized
    const [initializingTemplate, setInitializingTemplate] = useState<boolean>(true);

    // Function to initialize the template
    const initializeTemplate = useCallback(async () => {
        setInitializingTemplate(true);
        if (!pathname || !user?.id) return;

        if (pathname.includes("basic1template")) {
            const { data, error } = await getPortfolioData(user.id, templateNames.Basic1Template);

            console.log(data, error);

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
            console.log(data, error);

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
        } else if (pathname.includes("intermediate1template")) {
            const { data, error } = await getPortfolioData(user.id, templateNames.Intermediate1Template);
            console.log(data, error);

            if (data) {
                if (data.page_title) document.title = data.page_title;
                if (data.page_description) document.querySelector("meta[name='description']")?.setAttribute("content", data.page_description);
                dispatch(setTemplateData({
                    type: "intermediate1template",
                    data: data.data
                }));
                dispatch(setMode("editing"));
            } else {
                dispatch(setMode("checking"));
            }
        }

        setInitializingTemplate(false);
    }, [pathname, user, dispatch]);

    useEffect(() => {
        initializeTemplate();
    }, [pathname, user, initializeTemplate]);

    if (initializingTemplate) return <FullPageLoader />;

    return children;
};
