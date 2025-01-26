"use client";
import Button from "@/components/Button";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { Basic2TemplateData, SocialLinks } from "@/utils/interfaces";
import Link from "next/link";
import { useState } from "react";
import { FaLinkedinIn, FaGithub, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IoAdd } from "react-icons/io5";
import Basic2Button from "./Button";
import Image from "next/image";

const Basic2Footer = () => {

    const [inputEnabled, setInputEnabled] = useState<boolean>(false);
    const [addMoreDropDownEnabled, setAddMoreDropDownEnabled] = useState<boolean>(false);
    const [inputPlatform, setInputPlatform] = useState<SocialLinks>(null);
    const [inputLink, setInputLink] = useState<string>("");
    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);
    const dispatch = useDispatch();

    const handleLinkEdit = (link: { platform: SocialLinks, url: string | null }) => {
        setAddMoreDropDownEnabled(false);
        if (templateMode !== "editing") return;
        setInputPlatform(link.platform);
        setInputLink(link.url || "");
        setTimeout(() => {
            setInputEnabled(true);
        }, 0);
    };

    const handleLinkAdd = () => {
        setInputEnabled(false);
        if (templateMode !== "editing" || !inputPlatform || !templateData?.data) return;

        const updatedSocialLinks = [...(templateData.data as Basic2TemplateData).social];
        const index = updatedSocialLinks.findIndex(social => social.platform === inputPlatform);

        if (index === -1) {
            if (inputLink) {
                updatedSocialLinks.push({ platform: inputPlatform, url: inputLink });
            }
        } else {
            if (!inputLink) {
                updatedSocialLinks.splice(index, 1);
            } else {
                updatedSocialLinks[index] = { platform: inputPlatform, url: inputLink };
            }
        };

        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Basic2TemplateData),
                social: updatedSocialLinks
            }
        }));

        setTimeout(() => {
            setInputLink("");
            setInputPlatform(null);
        }, 0);
    }

    if (!templateData?.data) return null;

    return (
        <footer className="w-full mt-12 relative py-6 px-4 md:py-20 md:px-20">
            <Image src="/templateImages/footer_bg.avif" alt="footer background" width={400} height={400} className="w-full h-full object-cover object-center absolute top-0 left-0" />

            <div className="flex w-fit max-w-full mx-auto items-center gap-4 relative z-10">
                {
                    (templateData.data as Basic2TemplateData).social.map((link, index) => {

                        if (!link.url) return;

                        const linkIcon = link.platform === "Facebook" ? <FaFacebook size={24} /> : link.platform === "Instagram" ? <FaInstagram size={24} /> : link.platform === "Twitter" ? <FaXTwitter size={24} /> : link.platform === "LinkedIn" ? <FaLinkedinIn size={24} /> : link.platform === "GitHub" ? <FaGithub size={24} /> : null;

                        return (
                            <Link
                                href={link.url}
                                key={index}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent hover:opacity-50 duration-300 text-neutral-400"
                                onClick={(e) => {
                                    if (templateMode !== "done") {
                                        e.preventDefault();
                                        if (templateMode === "editing") handleLinkEdit(link);
                                    }
                                }}
                            >
                                {linkIcon}
                            </Link>
                        )
                    })
                }

                {
                    (templateMode === "editing" && (templateData.data as Basic2TemplateData).social.length < 5) && (
                        <div className="relative">
                            <Basic2Button className="flex items-center justify-center !p-0 w-9 h-9" onClick={() => setAddMoreDropDownEnabled(!addMoreDropDownEnabled)}>
                                <IoAdd size={24} />
                            </Basic2Button>

                            <div className={`absolute bottom-0 right-0 translate-x-full translate-y-full border-[#303030] rounded-lg w-[200px] overflow-hidden max-h-fit duration-300 ${addMoreDropDownEnabled ? "h-[200px] border" : "h-[0px] border-0"}`}>
                                {
                                    (['Instagram', 'Twitter', 'LinkedIn', 'GitHub', 'Facebook'] as SocialLinks[]).filter(platform => !(templateData.data as Basic2TemplateData).social.some(link => link.platform === platform))
                                        .map((platform, index) => (
                                            <button
                                                key={index}
                                                className="block w-full text-left px-4 py-1 duration-300 bg-white hover:bg-[#EDF7FA]"
                                                onClick={() => handleLinkEdit({ platform, url: null })}
                                            >
                                                {platform}
                                            </button>
                                        ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>

            {
                (templateMode === "editing" && inputEnabled) && (
                    <div className="mx-auto my-4 w-fit flex items-center relative z-10">
                        <input
                            type="text"
                            className=" px-5 py-1 max-w-full border duration-300 block bg-transparent text-white border-neutral-400 rounded-l-lg outline-none"
                            value={inputLink}
                            onChange={(e) => setInputLink(e.target.value)}
                        />
                        <Basic2Button className="border !w-fit !py-1 !px-2.5 !rounded-l-none !rounded-r-lg before:!rounded-l-none before:!rounded-r-lg" onClick={handleLinkAdd}>
                            <FaCheck size={24} />
                        </Basic2Button>
                    </div>
                )
            }
        </footer>
    );
};

export default Basic2Footer;
