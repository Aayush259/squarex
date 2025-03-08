"use client";
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
import Intermediate1Hero from "@/components/intermediates/intermediate1/Hero";
import Intermediate1About from "@/components/intermediates/intermediate1/About";
import Intermediate1Projects from "@/components/intermediates/intermediate1/Projects";
import { Intermediate1Contact } from "@/components/intermediates/intermediate1/Contact";
import Intermediate1Navigation from "@/components/intermediates/intermediate1/Navigation";
import { Intermediate1TemplateData } from "@/utils/interfaces";
import { createPortfolioWithIntermediate1Template } from "@/apis/createPortfolio";
import { getPortfolioData } from "@/apis/getPortfolio";

const Intermediate1 = () => {

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
        const { data, error } = await createPortfolioWithIntermediate1Template(templateData.data as Intermediate1TemplateData);
        if (error) {
            setError("Something went wrong");
        } else if (data) {
            console.log(data);
            if (pathname?.includes("portfolio")) {
                window.location.reload();
            } else {
                router.push(`/portfolio/${data.user_id}/i1`);
            }
        }
    };

    const getPortfolio = async () => {
        if (!slug || gettingPortfolio) return;
        setGettingPortfolio(true);
        const { data, error } = await getPortfolioData(slug as string, templateNames.Intermediate1Template);
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
                type: "intermediate1template",
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
                type: 'intermediate1template',
                data: {
                    home: {
                        name: "Aayush Kumar Kumawat",
                        headlines: ["A Full-stack Developer 🖥️", "A Tech enthusiast 🚀", "I take exciting challenges 🎯", "I like lots of sweets 🍰", "Shy but improving 😊"]
                    },
                    about: {
                        descriptionPart1: "Hello! I'm Aayush, a tech enthusiast and passionate code who is eager to learn and tackle new challenges. I value simplicity and creativity, and I strive to reflect these traits in my work. Whether I'm building innovative solutions or exploring new technologies, I'm dedicated to growing as a developer and contributing to the tech community.",
                        descriptionPart2: "I have honed my skills in modern technologies like React, Next.js, TypeScript, Node,js, Express. Tailwind CSS and more. My projects often incorporate advanced features like real-time updates with sockets and secure JWT-based authentication. I am excited to apply my knowledge and creativity.",
                    },
                    projects: [
                        {
                            name: "HEED",
                            description: "UI UX Case Study",
                            image: "/templateImages/heed.avif",
                            gitHubLink: "https://github.com/username/project",
                            url: "/",
                        },
                        {
                            name: "Fly way",
                            description: "Travel Agency Website Design",
                            image: "/templateImages/fly_Way.avif",
                            gitHubLink: "https://github.com/username/project",
                            url: "/",
                        },
                        {
                            name: "Sushi Restaurant",
                            description: "Social Media Poster Design",
                            image: "/templateImages/sushi.avif",
                            gitHubLink: "https://github.com/username/project",
                            url: "/",
                        },
                        {
                            name: "Shoppy Bag",
                            description: "Shoppy Bag",
                            image: "/templateImages/shoppy.avif",
                            gitHubLink: "https://github.com/username/project",
                            url: "/",
                        }
                    ],
                    social: [
                        {
                            platform: "GitHub",
                            url: "/",
                        },
                        {
                            platform: "LinkedIn",
                            url: "/",
                        },
                        {
                            platform: "Twitter",
                            url: "/",
                        },
                        {
                            platform: "Instagram",
                            url: "/",
                        },
                        {
                            platform: "Facebook",
                            url: "/",
                        }
                    ]
                }
            }));
        }
    }, []);

    if (gettingPortfolio) return <FullPageLoader />;

    if (error === "NOT_FOUND") return <NotFound />;

    if (error) return <SomethingWentWrong />;

    if (!templateData) return null;

    return (
        <div id={IDs.B1} className="bg-black h-screen w-screen fixed top-0 left-0 heebo overflow-y-auto overflow-x-hidden pb-20">
            {
                settingUpPortfolio && <CreatingPortfolioSpinner />
            }

            <Intermediate1Hero />
            <Intermediate1About />
            <Intermediate1Projects />
            <Intermediate1Contact />
            <Intermediate1Navigation />

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

export default Intermediate1;
