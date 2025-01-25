"use client";
import { getPortfolioWithBasic1Template } from "@/apis/getPortfolio";
import Button from "@/components/Button";
import { NotFound, SomethingWentWrong } from "@/components/Error";
import { CreatingPortfolioSpinner, FullPageLoader } from "@/components/Loader";
import { selectTemplateData, selectTemplateMode, setMode, setTemplateData } from "@/store/templateSlice";
import { selectUser } from "@/store/userSlice";
import { IDs } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoPencil } from "react-icons/go";
import Basic2Header from "@/components/basics/basic2/Header";
import Basic2Hero from "@/components/basics/basic2/Hero";

const Basic2 = () => {

    // const templateMode = useSelector(selectTemplateMode);
    // const templateData = useSelector(selectTemplateData);
    // const user = useSelector(selectUser);
    // const dispatch = useDispatch();
    // const router = useRouter();
    // const pathname = usePathname();
    // const params = useParams();
    // const slug = params?.slug;

    // const [settingUpPortfolio, setSettingUpPortfolio] = useState<boolean>(false);
    // const [gettingPortfolio, setGettingPortfolio] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    // const setupPortfolio = async () => {
    //     // if (!templateData?.basic1template || settingUpPortfolio) return;
    //     // setSettingUpPortfolio(true);
    //     // const { data, error } = await createPortfolioWithBasic1Template(templateData.basic1template);
    //     // if (error) {
    //     //     setError("Something went wrong");
    //     // } else if (data) {
    //     //     console.log(data);
    //     //     if (pathname?.includes("portfolio")) {
    //     //         window.location.reload();
    //     //     } else {
    //     //         router.push(`/portfolio/${data.user_id}/b1`);
    //     //     }
    //     // }
    // };

    // const getPortfolio = async () => {
    //     if (!slug || gettingPortfolio) return;
    //     setGettingPortfolio(true);
    //     const { data, error } = await getPortfolioWithBasic1Template(slug as string);
    //     if (error) {
    //         if (error === "NOT_FOUND") {
    //             setError("NOT_FOUND");
    //         } else {
    //             setError("Something went wrong");
    //         }
    //         console.log(error);
    //     } else if (data) {
    //         console.log(data);
    //         // dispatch(setTemplateData({
    //         //     basic1template: data.data
    //         // }));
    //         if (data.page_title) document.title = data.page_title;
    //         if (data.page_description) document.querySelector("meta[name='description']")?.setAttribute("content", data.page_description);
    //         dispatch(setMode("done"));
    //     }
    //     setTimeout(() => {
    //         setGettingPortfolio(false);
    //     }, 0);
    // }

    // const handleFixedBtnClick = () => {
    //     if (settingUpPortfolio) return;
    //     if (user?.id.toString() === slug?.toString() && templateMode === "done") {
    //         dispatch(setMode("editing"));
    //     } else if (templateMode === "checking") {
    //         dispatch(setMode("editing"))
    //     } else if (templateMode === "editing") {
    //         dispatch(setMode("reviewing"));
    //     } else if (templateMode === "reviewing") {
    //         setupPortfolio();
    //         dispatch(setMode("done"));
    //     }
    // };

    // // Initialize template data
    // useEffect(() => {
    //     // if (templateData?.basic1template) return;

    //     if (slug) {
    //         // getPortfolio();
    //     } else {
            
    //     }
    // }, []);

    // if (gettingPortfolio) return <FullPageLoader />

    // if (error === "NOT_FOUND") return <NotFound />;

    // if (error) return <SomethingWentWrong />;

    // if (!templateData) return null;

    return (
        <div id={IDs.B1} className="bg-[#FFFFFF] text-[#303030] h-screen w-screen fixed top-0 left-0 heebo overflow-y-auto overflow-x-hidden">
            {/* {
                settingUpPortfolio && <CreatingPortfolioSpinner />
            } */}

            <Basic2Header />
            <Basic2Hero />

            {/* <div className="z-50 !fixed bottom-20 right-5 md:bottom-10 md:right-10 flex items-center gap-2">
                {
                    !settingUpPortfolio && templateMode === "reviewing" && (
                        <Button className="border border-white hover:border-[var(--primary)] shadow !py-1 !px-2" onClick={() => dispatch(setMode("editing"))}>
                            <GoPencil size={24} />
                        </Button>
                    )
                }

                {
                    (!settingUpPortfolio && !slug) && (
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
            </div> */}
        </div>
    );
};

export default Basic2;
