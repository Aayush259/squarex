"use client";
import { GoHomeFill, GoProjectSymlink } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { LuMessageSquare } from "react-icons/lu";
import { FaLinkedinIn, FaGithub, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { selectTemplateMode } from "@/store/templateSlice";
import { useSelector } from "react-redux";

export default function Intermediate1Navigation() {

    const templateMode = useSelector(selectTemplateMode);

    const myLinks = [
        {
            title: "Home",
            icon: (
                <GoHomeFill className="h-full w-full text-neutral-300" />
            ),
            href: "/",
            active: true,
            onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault();
                window.location.href = "/";
            }
        },

        {
            title: "Projects",
            icon: (
                <GoProjectSymlink className="h-full w-full text-neutral-300" />
            ),
            href: "/projects",
            active: true,
        },
        {
            title: "About",
            icon: (
                <HiOutlineInformationCircle className="h-full w-full text-neutral-300" />
            ),
            href: "/about",
            active: true,
        },
        {
            title: "Contact",
            icon: (
                <LuMessageSquare className="h-full w-full text-neutral-300" />
            ),
            href: "/contact",
            active: templateMode !== "editing",
        },
        {
            title: "GitHub",
            icon: (
                <FaGithub className="h-full w-full text-neutral-300" />
            ),
            href: "https://github.com/Aayush259",
            active: true,
        },
        {
            title: "X",
            icon: (
                <FaXTwitter className="h-full w-full text-neutral-300" />
            ),
            href: "https://x.com/Aayush259_",
            active: true,
        },
        {
            title: "LinkedIn",
            icon: (
                <FaLinkedinIn className="h-full w-full text-neutral-300" />
            ),
            href: "https://www.linkedin.com/in/aayush-kumar-259/",
            active: true,
        },
        {
            title: "Facebook",
            icon: (
                <FaFacebook className="h-full w-full text-neutral-300" />
            ),
            href: "https://www.facebook.com/aayush.sharma.259",
            active: true,
        },
        {
            title: "Instagram",
            icon: (
                <FaInstagram className="h-full w-full text-neutral-300" />
            ),
            href: "https://www.instagram.com/aayush_sharma_259/",
            active: true,
        },
    ];

    return (
        <div className="fixed md:w-full left-10 md:left-0 bottom-32 md:bottom-10 z-50">
            <div className="flex items-center justify-center w-full">
                <FloatingDock
                    mobileClassName="translate-y-20"
                    items={myLinks}
                />
            </div>
        </div>
    );
};
