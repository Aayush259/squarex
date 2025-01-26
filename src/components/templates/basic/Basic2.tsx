"use client";
import { getPortfolioData } from "@/apis/getPortfolio";
import Button from "@/components/Button";
import { NotFound, SomethingWentWrong } from "@/components/Error";
import { CreatingPortfolioSpinner, FullPageLoader } from "@/components/Loader";
import { selectTemplateData, selectTemplateMode, setMode, setSelectedTemplate, setTemplateData } from "@/store/templateSlice";
import { selectUser } from "@/store/userSlice";
import { IDs, templateNames } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoPencil } from "react-icons/go";
import Basic2Header from "@/components/basics/basic2/Header";
import Basic2Hero from "@/components/basics/basic2/Hero";
import Basic2About from "@/components/basics/basic2/About";
import Basic2Projects from "@/components/basics/basic2/Projects";
import Basic2WhatiDo from "@/components/basics/basic2/WhatIDo";
import Basic2Contact from "@/components/basics/basic2/Contact";
import { createPortfolioWithBasic2Template } from "@/apis/createPortfolio";
import { Basic2TemplateData } from "@/utils/interfaces";
import Basic2Footer from "@/components/basics/basic2/Footer";

const Basic2 = () => {

    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const slug = params?.slug;

    const [settingUpPortfolio, setSettingUpPortfolio] = useState<boolean>(false);
    const [gettingPortfolio, setGettingPortfolio] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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
                router.push(`/dashboard`);
            }
        }
    };

    const getPortfolio = async () => {
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
    }

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
        dispatch(setSelectedTemplate("basic2template"));
        if (templateData?.data) return;
        
        if (slug) {
            getPortfolio();
        } else {
            dispatch(setTemplateData({
                type: 'basic2template',
                data: {
                    home: {
                        title: "Home",
                        name: "👋 Hi! There, I'm Sathya,",
                        role: "UI UX Designer & Web Designer",
                        bio: "I Design Beautifully Simple Things And I Love What I Do. Just Simple Like That!"
                    },
                    about: {
                        title: "About Me",
                        descriptionPart1: "Hello! I'm Sathya Narayanan, a passionate and creative UI/UX designer ready to embark on a journey of shaping exceptional digital experiences. With a fresh perspective and a keen eye for detail, I bring enthusiasm and dedication to every project I undertake.",
                        descriptionPart2: "I have honed my skills in user research, wireframing, prototyping, and visual design. I am excited to apply my knowledge and creativity to solve complex design challenges and create intuitive and visually appealing interfaces"
                    },
                    work: {
                        title: "Selected Works",
                        projects: [
                            {
                                title: "HEED",
                                description: "UI UX Case Study",
                                image: "/templateImages/heed.avif",
                                url: "/",
                            },
                            {
                                title: "Fly way",
                                description: "Travel Agency Website Design",
                                image: "/templateImages/fly_Way.avif",
                                url: "/",
                            },
                            {
                                title: "Sushi Restaurant",
                                description: "Social Media Poster Design",
                                image: "/templateImages/sushi.avif",
                                url: "/",
                            },
                            {
                                title: "Shoppy Bag",
                                description: "Shoppy Bag",
                                image: "/templateImages/shoppy.avif",
                                url: "/",
                            }
                        ]
                    },
                    skills: {
                        title: "What I Do!",
                        subtitle: "My Specialization And Key Skills",
                        skills: ["UI/UX Design", "Photoshop", "Illustrator", "Figma", "Web Design", "Logo Design"]
                    },
                    social: [
                        {
                            platform: "LinkedIn",
                            url: "/",
                        },
                        {
                            platform: "GitHub",
                            url: "/",
                        },
                        {
                            platform: "Instagram",
                            url: "/",
                        },
                        {
                            platform: "Twitter",
                            url: "/",
                        },
                        {
                            platform: "Facebook",
                            url: "/",
                        },
                    ]
                }
            }));
        }
    }, []);

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
            <Basic2Projects />
            <Basic2WhatiDo />
            <Basic2Contact />
            <Basic2Footer />

            <div className="z-50 !fixed bottom-20 right-5 md:bottom-10 md:right-10 flex items-center gap-2">
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
            </div>
        </div>
    );
};

export default Basic2;
