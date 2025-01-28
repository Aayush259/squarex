"use client";
import { createPortfolioWithBasic1Template } from "@/apis/createPortfolio";
import { getPortfolioData } from "@/apis/getPortfolio";
import Basic1Contact from "@/components/basics/basic1/Contact";
import Basic1Footer from "@/components/basics/basic1/Footer";
import Basic1Header from "@/components/basics/basic1/Header";
import Basic1Hero from "@/components/basics/basic1/Hero";
import Basic1Projects from "@/components/basics/basic1/Projects";
import Basic1Skills from "@/components/basics/basic1/Skills";
import Button from "@/components/Button";
import { NotFound, SomethingWentWrong } from "@/components/Error";
import { CreatingPortfolioSpinner, FullPageLoader } from "@/components/Loader";
import { selectTemplateData, selectTemplateMode, setMode, setTemplateData } from "@/store/templateSlice";
import { selectUser } from "@/store/userSlice";
import { IDs, templateNames } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoPencil } from "react-icons/go";
import { Basic1TemplateData } from "@/utils/interfaces";

const Basic1 = () => {

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
        const { data, error } = await createPortfolioWithBasic1Template(templateData.data as Basic1TemplateData);
        if (error) {
            setError("Something went wrong");
        } else if (data) {
            console.log(data);
            if (pathname?.includes("portfolio")) {
                window.location.reload();
            } else {
                router.push(`/portfolio/${data.user_id}/b1`);
            }
        }
    };

    const getPortfolio = async () => {
        if (!slug || gettingPortfolio) return;
        setGettingPortfolio(true);
        const { data, error } = await getPortfolioData(slug as string, templateNames.Basic1Template);
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
                type: "basic1template",
                data: data.data,
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
        if (templateData?.data) return;

        if (slug) {
            getPortfolio();
        } else {
            dispatch(setTemplateData({
                type: 'basic1template',
                data: {
                    home: {
                        title: "Home",
                        name: "Aayush",
                        role: "Creative Technologist",
                        bio: "I'm a creative technologist based in India. I love to create beautiful and functional websites. I'm currently working at a startup called MyStartup. I'm also a part-time freelancer and I love to work with startups that are building the future.",
                        image: "/MyImg.jpeg"
                    },
                    work: {
                        title: "My Work",
                        projects: [
                            {
                                title: "Square: Real-time chat app",
                                description: "Square is a real-time chat application built using modern web technologies. It allows users to connect, chat, and manage profiles with seamless updates and an intuitive user interface.",
                                image: "/slider1.jpg",
                                url: "/"
                            },
                            {
                                title: "Square: Real-time chat app",
                                description: "Square is a real-time chat application built using modern web technologies. It allows users to connect, chat, and manage profiles with seamless updates and an intuitive user interface.",
                                image: "/slider2.jpg",
                                url: "/"
                            },
                            {
                                title: "Square: Real-time chat app",
                                description: "Square is a real-time chat application built using modern web technologies. It allows users to connect, chat, and manage profiles with seamless updates and an intuitive user interface.",
                                image: "/slider1.jpg",
                                url: "/"
                            },
                        ]
                    },
                    skills: ["JavaScript", "TypeScript", "Next JS", "React JS", "Tailwind CSS", "MERN Stack"],
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
                    ],
                }
            }));
        }
    }, []);

    if (gettingPortfolio) return <FullPageLoader />

    if (error === "NOT_FOUND") return <NotFound />;

    if (error) return <SomethingWentWrong />;

    if (!templateData) return null;

    return (
        <div id={IDs.B1} className="bg-[#EDF7FA] text-[#21243D] h-screen w-screen fixed top-0 left-0 heebo overflow-y-auto overflow-x-hidden">
            {
                settingUpPortfolio && <CreatingPortfolioSpinner />
            }

            <Basic1Header />
            <Basic1Hero />
            <Basic1Projects />
            <Basic1Skills />
            <Basic1Contact />
            <Basic1Footer />

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

export default Basic1;
