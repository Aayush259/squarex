"use client";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDs } from "@/utils/helper";
import { restoreCursorPosition, scrollToElement } from "@/utils/funcs";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { Intermediate1TemplateData } from "@/utils/interfaces";
import { IoIosClose } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { GoHomeFill, GoProjectSymlink } from "react-icons/go";
import { FaLinkedinIn, FaGithub, FaFacebook, FaPen } from "react-icons/fa";
import { FloatingDock } from "@/components/ui/FloatingDock";

export default function Intermediate1Navigation() {
    
    const dispatch = useDispatch();

    const templateMode = useSelector(selectTemplateMode);   // Stores current mode of template (e.g., editing, reviewing, etc.)
    const templateData = useSelector(selectTemplateData);   // Stores portfolio template data

    const [editNav, setEditNav] = useState<boolean>(false);    // State to control the visibility of the edit navigation window
    const socialRef = useRef<(HTMLSpanElement | null)[]>([]);   // Reference to the social links

    // Array of all links for floating dock
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
                templateMode !== 'editing' ? scrollToElement(IDs.B1) : undefined
            }
        },
        {
            title: "Projects",
            icon: (
                <GoProjectSymlink className="h-full w-full text-neutral-300" />
            ),
            href: "/projects",
            active: true,
            onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault();
                templateMode !== 'editing' ? scrollToElement(IDs.B1, IDs.PROJECTS) : undefined
            }
        },
        {
            title: "About",
            icon: (
                <HiOutlineInformationCircle className="h-full w-full text-neutral-300" />
            ),
            href: "/about",
            active: true,
            onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault();
                templateMode !== 'editing' ? scrollToElement(IDs.B1, IDs.ABOUT) : undefined
            }
        },
        {
            title: "Contact",
            icon: (
                <LuMessageSquare className="h-full w-full text-neutral-300" />
            ),
            href: "/contact",
            active: templateMode !== "editing",
            onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault();
                templateMode !== 'editing' ? scrollToElement(IDs.B1, IDs.CONTACT) : undefined
            }
        },
        ...(templateData?.data as Intermediate1TemplateData).social.filter(s => s.url?.trim() !== "").map(platform => ({
            title: platform.platform as string,
            icon: platform.platform === "GitHub" ? (
                <FaGithub className="h-full w-full text-neutral-300" />
            ) : platform.platform === "Instagram" ? (
                <FaInstagram className="h-full w-full text-neutral-300" />
            ) : platform.platform === "Twitter" ? (
                <FaXTwitter className="h-full w-full text-neutral-300" />
            ) : platform.platform === "LinkedIn" ? (
                <FaLinkedinIn className="h-full w-full text-neutral-300" />
            ) : (
                <FaFacebook className="h-full w-full text-neutral-300" />
            ),
            href: platform.url as string,
            active: true,
        })),
        {
            title: "Edit",
            icon: (
                <FaPen className="h-full w-full text-neutral-300" />
            ),
            href: "/",
            active: templateMode === "editing",
            onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault();
                setEditNav(!editNav);
            }
        }
    ];

    // Function to handle social link change
    const handleSocialChange = (index: number) => {
        const ref = socialRef.current[index];
        if (!ref || !templateData?.data) return;

        const selection = window.getSelection();

        if (!selection) return;

        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;

        const updatedSocial = [...(templateData?.data as Intermediate1TemplateData).social];
        updatedSocial[index] = {
            ...updatedSocial[index],
            url: ref.textContent || "",
        };

        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Intermediate1TemplateData),
                social: updatedSocial,
            }
        }));

        restoreCursorPosition(ref, cursorPosition, selection);
    };

    if (!templateData) return;

    return (
        <div className="fixed md:w-full left-10 md:left-0 bottom-32 md:bottom-10 z-50">
            {
                editNav && (
                    <div className="w-screen h-screen fixed bg-black/40 z-[60] top-0 left-0 flex items-center justify-center">
                        <div className="w-[500px] rounded-xl bg-black max-w-[96vw] mx-auto overflow-hidden relative border border-gray-700">
                            <div className="w-full px-4 py-3 flex items-center justify-between gap-4">
                                {"Edit Social Links: (or keep empty to remove)"}
                                <button className="rounded-full duration-300 hover:opacity-50" onClick={() => setEditNav(false)}>
                                    <IoIosClose size={44} />
                                </button>
                            </div>
                            <span
                                className="block overflow-hidden border w-full border-gray-700"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {
                                    (templateData.data as Intermediate1TemplateData).social.map((soc, idx) => (
                                        <div key={idx} className="flex items-center gap-4 border-gray-700 border-y py-3 px-6 w-full">
                                            {
                                                soc.platform === "GitHub" ? (
                                                    <FaGithub size={30} className="text-neutral-300" />
                                                ) : soc.platform === "Instagram" ? (
                                                    <FaInstagram size={30} className="text-neutral-300" />
                                                ) : soc.platform === "Twitter" ? (
                                                    <FaXTwitter size={30} className="text-neutral-300" />
                                                ) : soc.platform === "LinkedIn" ? (
                                                    <FaLinkedinIn size={30} className="text-neutral-300" />
                                                ) : (
                                                    <FaFacebook size={30} className="text-neutral-300" />
                                                )
                                            }

                                            <span
                                                className="outline-none block overflow-hidden whitespace-nowrap min-w-[70%]"
                                                key={idx}
                                                ref={(el: HTMLSpanElement | null) => {
                                                    socialRef.current[idx] = el
                                                }}
                                                contentEditable={templateMode === "editing"}
                                                suppressContentEditableWarning
                                                onInput={() => handleSocialChange(idx)}
                                            >{soc.url}</span>
                                        </div>
                                    ))
                                }
                            </span>
                        </div>
                    </div>
                )
            }

            <div className="flex items-center justify-center w-full">
                <FloatingDock
                    mobileClassName="translate-y-20"
                    items={myLinks}
                />
            </div>
        </div>
    );

};