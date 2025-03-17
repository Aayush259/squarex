"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/store/userSlice";
import { selectTemplateData, selectTemplateMode, setMode, setTemplateData } from "@/store/templateSlice";
import { basic2TemplateExampleData, IDs, templateNames } from "@/utils/helper";
import { Basic2TemplateData } from "@/utils/interfaces";
import { createPortfolioWithBasic2Template } from "@/apis/createPortfolio";
import { getPortfolioData } from "@/apis/getPortfolio";
import { GoPencil } from "react-icons/go";
import { NotFound, SomethingWentWrong } from "@/components/Error";
import { CreatingPortfolioSpinner, FullPageLoader } from "@/components/Loader";
import useEngagementTracker from "@/hooks/useEngagementTracker";
import Button from "@/components/Button";
import Basic2Header from "@/components/basics/basic2/Header";
import Basic2Hero from "@/components/basics/basic2/Hero";
import Basic2About from "@/components/basics/basic2/About";
import Basic2Projects from "@/components/basics/basic2/Projects";
import Basic2WhatiDo from "@/components/basics/basic2/WhatIDo";
import Basic2Contact from "@/components/basics/basic2/Contact";
import Basic2Footer from "@/components/basics/basic2/Footer";

const Basic2 = () => {

    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();

    const slug = params?.slug;  // Identifier for portfolio owner

    // Hook to track engagement
    const { trackProjectClick, trackSocialClick } = useEngagementTracker(typeof slug === "string" ? slug : undefined);

    const templateMode = useSelector(selectTemplateMode);   // Stores current mode of template (e.g., editing, reviewing, etc.)
    const templateData = useSelector(selectTemplateData);   // Stores portfolio template data
    const user = useSelector(selectUser);   // Stores user data

    const [settingUpPortfolio, setSettingUpPortfolio] = useState<boolean>(false);   // Loading state while setting up portfolio
    const [gettingPortfolio, setGettingPortfolio] = useState<boolean>(false);   // Loading state while getting portfolio data
    const [error, setError] = useState<string | null>(null);    // Error state

    // Function to handle portfolio setup
    const setupPortfolio = async () => {
        if (!templateData?.data || settingUpPortfolio) return;
        setSettingUpPortfolio(true);
        const { data, error } = await createPortfolioWithBasic2Template(templateData.data as Basic2TemplateData);
        if (error) {
            setError("Something went wrong");
        } else if (data) {
            console.log(data);
            if (pathname?.includes("portfolio")) {
                window.location.reload();
            } else {
                router.push(`/portfolio/${data.user_id}/b2`);
            }
        }
    };

    // Function to handle portfolio retrieval and dispatch data to store
    const getPortfolio = useCallback(async () => {
        if (!slug || gettingPortfolio) return;
        setGettingPortfolio(true);
        const { data, error } = await getPortfolioData(slug as string, templateNames.Basic2Template);
        if (error) {
            if (error === "NOT_FOUND") {
                setError("NOT_FOUND");
            } else {
                setError("Something went wrong");
            }
            console.log(error);
        } else if (data) {
            console.log(data);
            dispatch(setTemplateData({
                type: "basic2template",
                data: data.data
            }));
            if (data.page_title) document.title = data.page_title;
            if (data.page_description) document.querySelector("meta[name='description']")?.setAttribute("content", data.page_description);
            dispatch(setMode("done"));
        }
        setTimeout(() => {
            setGettingPortfolio(false);
        }, 0);
    }, [slug, gettingPortfolio, dispatch]);

    // Function to handle fixed button click
    const handleFixedBtnClick = () => {
        if (settingUpPortfolio) return;
        if (user?.id.toString() === slug?.toString() && templateMode === "done") {
            dispatch(setMode("editing"));
        } else if (templateMode === "checking") {
            dispatch(setMode("editing"))
        } else if (templateMode === "editing") {
            dispatch(setMode("reviewing"));
        } else if (templateMode === "reviewing") {
            setupPortfolio();
            dispatch(setMode("done"));
        }
    };

    // Initialize template data
    useEffect(() => {
        if (templateData?.data) return;

        if (slug) {
            getPortfolio();
        } else {
            dispatch(setTemplateData(basic2TemplateExampleData));
        }
    }, [dispatch, getPortfolio, slug, templateData?.data]);

    if (gettingPortfolio) return <FullPageLoader />
    if (error === "NOT_FOUND") return <NotFound />;
    if (error) return <SomethingWentWrong />;
    if (!templateData) return null;

    return (
        <div id={IDs.B1} className="bg-[#FFFFFF] text-[#303030] h-screen w-screen fixed top-0 left-0 heebo overflow-y-auto overflow-x-hidden">
            {
                settingUpPortfolio && <CreatingPortfolioSpinner />
            }

            <Basic2Header />
            <Basic2Hero />
            <Basic2About />
            <Basic2Projects trackProjectClick={trackProjectClick} trackSocialClick={trackSocialClick} />
            <Basic2WhatiDo />
            <Basic2Contact />
            <Basic2Footer trackProjectClick={trackProjectClick} trackSocialClick={trackSocialClick} />

            <div className="z-50 !fixed bottom-20 right-5 md:bottom-10 md:right-10 flex items-center gap-2">
                {
                    !settingUpPortfolio && templateMode === "reviewing" && (
                        <Button className="border border-white hover:border-[var(--primary)] shadow !py-1 !px-2" onClick={() => dispatch(setMode("editing"))}>
                            <GoPencil size={24} />
                        </Button>
                    )
                }

                {
                    (!settingUpPortfolio && !slug && templateMode !== "checking") && (
                        <Button className="border border-white hover:border-[var(--primary)] shadow !py-1" onClick={handleFixedBtnClick}>
                            {
                                templateMode === "editing" ? "Preview" : templateMode === "reviewing" ? "Publish" : null
                            }
                        </Button>
                    )
                }

                {
                    (slug?.toString() === user?.id.toString() && !settingUpPortfolio) && (
                        <Button className="border border-white hover:border-[var(--primary)] shadow !py-1 !px-2" onClick={handleFixedBtnClick}>
                            {
                                templateMode === "editing" ? "Preview" : templateMode === "reviewing" ? "Publish" : templateMode === "done" ? <GoPencil size={24} /> : null
                            }
                        </Button>
                    )
                }

                {
                    templateMode === "checking" && <Button className="border border-white hover:border-[var(--primary)] shadow !py-1 !px-2" onClick={() => dispatch(setMode("editing"))}>
                        {"Use this template"}
                    </Button>
                }
            </div>
        </div>
    );
};

export default Basic2;
