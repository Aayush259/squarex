"use client";
import { createPortfolioWithBasic1Template } from "@/apis/createPortfolio";
import { getPortfolioWithBasic1Template } from "@/apis/getPortfolio";
import Basic1Contact from "@/components/basics/basic1/Contact";
import Basic1Footer from "@/components/basics/basic1/Footer";
import Basic1Header from "@/components/basics/basic1/Header";
import Basic1Hero from "@/components/basics/basic1/Hero";
import Basic1Projects from "@/components/basics/basic1/Projects";
import Basic1Skills from "@/components/basics/basic1/Skills";
import Button from "@/components/Button";
import { CreatingPortfolioSpinner } from "@/components/Loader";
import { selectTemplateData, selectTemplateMode, setMode, setTemplateData } from "@/store/templateSlice";
import { selectUser } from "@/store/userSlice";
import { TemplateMode } from "@/utils/interfaces";
import { usePathname } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

    const setupPortfolio = async () => {
        if (!templateData?.basic1template || settingUpPortfolio) return;
        setSettingUpPortfolio(true);
        const { data, error } = await createPortfolioWithBasic1Template(templateData.basic1template);
        if (error) {
            // Handle error
        } else if (data) {
            console.log(data);
            if (pathname?.includes("portfolio")) {
                window.location.reload();
            } else {
                router.push(`/portfolio/${data.user_id}/basic1template`);
            }
        }
    };

    const getPortfolio = async () => {
        if (!slug || gettingPortfolio) return;
        setGettingPortfolio(true);
        const { data, error } = await getPortfolioWithBasic1Template(slug as string);
        if (error) {
            // Handle error
        } else if (data) {
            console.log(data);
            dispatch(setTemplateData({
                basic1template: data.data
            }));
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
        if (slug) {
            getPortfolio();
        } else {
            dispatch(setTemplateData({
                basic1template: {
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

    if (gettingPortfolio) {
        return <p>Loading..</p>
    }

    if (!templateData) return null;

    return (
        <div className="bg-[#EDF7FA] text-[#21243D] h-screen w-screen fixed top-0 left-0 heebo overflow-y-auto overflow-x-hidden">
            {
                settingUpPortfolio && <CreatingPortfolioSpinner />
            }

            <Basic1Header />
            <Basic1Hero />
            <Basic1Projects />
            <Basic1Skills />
            <Basic1Contact />
            <Basic1Footer />

            {
                (slug?.toString() === user?.id.toString() && !settingUpPortfolio) && (
                    <Button className="z-50 border border-white hover:border-[var(--primary)] !fixed bottom-10 right-10 shadow !py-1" onClick={handleFixedBtnClick}>
                        {
                            templateMode === "editing" ? "Preview" : templateMode === "reviewing" ? "Publish" : templateMode === "done" ? "Edit" : null
                        }
                    </Button>
                )
            }
        </div>
    );
};

export default Basic1;
