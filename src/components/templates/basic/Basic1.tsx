"use client";
import Basic1Contact from "@/components/basics/basic1/Contact";
import Basic1Header from "@/components/basics/basic1/Header";
import Basic1Hero from "@/components/basics/basic1/Hero";
import Basic1Projects from "@/components/basics/basic1/Projects";
import Basic1Skills from "@/components/basics/basic1/Skills";
import Button from "@/components/Button";
import { selectTemplateMode, setMode, setTemplateData } from "@/store/templateSlice";
import { selectUser } from "@/store/userSlice";
import { TemplateMode } from "@/utils/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Basic1 = () => {

    const templateMode = useSelector(selectTemplateMode);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug;

    const setupPortfolio = async () => { };

    const handleFixedBtnClick = () => {
        if (user?.id.toString() === slug?.toString() && templateMode === "done") {
            router.push("/template/basic1template");
            setTimeout(() => {
                dispatch(setMode("editing"));
            }, 0);
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
        if (!slug) {
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
                    skills: ["JavaScript", "TypeScript", "Next JS", "React JS", "Tailwind CSS", "MERN Stack"]
                }
            }));
        } else {

        }
    }, []);

    return (
        <div className="bg-[#EDF7FA] text-[#21243D] h-screen w-screen fixed top-0 left-0 heebo overflow-y-auto">
            <Basic1Header />
            <Basic1Hero />
            <Basic1Projects />
            <Basic1Skills />
            <Basic1Contact />

            {
                slug?.toString() !== user?.id.toString() && (
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
