"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/store/userSlice";
import { selectTemplateData, selectTemplateMode, setMode, setTemplateData } from "@/store/templateSlice";
import { Basic1TemplateData, Basic2TemplateData, Intermediate1TemplateData, TemplateDataType, TemplateType } from "@/utils/interfaces";
import { getPortfolioData } from "@/apis/getPortfolio";
import { GoPencil } from "react-icons/go";
import { NotFound, SomethingWentWrong } from "@/components/Error";
import { CreatingPortfolioSpinner, FullPageLoader } from "@/components/Loader";
import useEngagementTracker from "@/hooks/useEngagementTracker";
import Button from "@/components/Button";
import { getPortfolioUrls } from "@/utils/funcs";

const BaseTemplate: React.FC<{
    templateName: TemplateType;
    exampleTemplateData: {
        type: TemplateType;
        data: TemplateDataType
    };
    createPortfolio: (data: Basic1TemplateData | Basic2TemplateData | Intermediate1TemplateData) => Promise<{ error: string | null, created: boolean }>;
    setTrackingFunctions: React.Dispatch<React.SetStateAction<{
        trackProjectClick: () => void;
        trackSocialClick: () => void;
    }>>;
    children: React.ReactNode;
}> = ({ templateName, exampleTemplateData, createPortfolio, setTrackingFunctions, children }) => {
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
        const { created, error } = await createPortfolio(templateData.data);
        if (error) {
            setError("Something went wrong");
        } else if (created) {
            if (pathname?.includes("portfolio")) {
                window.location.reload();
            } else {
                router.push(getPortfolioUrls(templateName, user.id).portfolioUrl);
            }
        }
    };

    // Function to handle portfolio retrieval and dispatch data to store
    const getPortfolio = useCallback(async () => {
        if (!slug || gettingPortfolio || !templateName) return;
        setGettingPortfolio(true);
        const { data, error } = await getPortfolioData(slug as string, templateName);
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
                type: templateName,
                data: data.data,
            }));
            if (data.page_title) document.title = data.page_title;
            if (data.page_description) document.querySelector("meta[name='description']")?.setAttribute("content", data.page_description);
            dispatch(setMode("done"));
        }
        setTimeout(() => {
            setGettingPortfolio(false);
        }, 0);
    }, [slug, dispatch]);

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
            dispatch(setTemplateData(exampleTemplateData));
        }
    }, [dispatch, getPortfolio, slug]);

    // Pass tracking functions to parent when they're initialized
    useEffect(() => {
        setTrackingFunctions({ trackProjectClick, trackSocialClick });
    }, [setTrackingFunctions]);

    if (gettingPortfolio) return <FullPageLoader />;
    if (error === "NOT_FOUND") return <NotFound />;
    if (error) return <SomethingWentWrong />;
    if (!templateData) return null;

    return (
        <div className="bg-black h-screen w-screen fixed top-0 left-0 overflow-hidden">
            {
                settingUpPortfolio && <CreatingPortfolioSpinner />
            }

            {children}

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

export default BaseTemplate;

