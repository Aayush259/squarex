"use client";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { restoreCursorPosition, scrollToElement } from "@/utils/funcs";
import { IDs } from "@/utils/helper";
import { Basic2TemplateData, SpanProps } from "@/utils/interfaces";
import { RefObject, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Basic2Header() {

    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);
    const homeLinkRef = useRef<HTMLSpanElement | null>(null);
    const aboutLinkRef = useRef<HTMLSpanElement | null>(null);
    const workLinkRef = useRef<HTMLSpanElement | null>(null);
    const whatIdoLinkRef = useRef<HTMLSpanElement | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleNameChange = (ref: RefObject<HTMLSpanElement | null>) => {
        if (!ref.current || !templateData?.data) return;

        const selection = window.getSelection();

        if (selection) {
            // Save the current cursor position
            const range = selection.getRangeAt(0);
            const cursorPosition = range.startOffset;

            dispatch(setTemplateData({
                ...templateData,
                data: {
                    ...templateData.data as Basic2TemplateData,
                    home: {
                        ...(templateData?.data as Basic2TemplateData).home,
                        title: homeLinkRef.current?.textContent || "",
                    },
                    work: {
                        ...(templateData?.data as Basic2TemplateData).work,
                        title: workLinkRef.current?.textContent || "",
                    },
                    about: {
                        ...(templateData?.data as Basic2TemplateData).about,
                        title: aboutLinkRef.current?.textContent || "",
                    },
                    skills: {
                        ...(templateData?.data as Basic2TemplateData).skills,
                        title: whatIdoLinkRef.current?.textContent || "",
                    }
                }
            }));

            // Restore the cursor position
            restoreCursorPosition(ref.current, cursorPosition, selection);
        }
    };

    if (!templateData?.data) return null;

    return (
        <header className="flex sticky top-0 left-0 z-50 bg-[#FFFFFF] py-5 px-10 md:items-center md:justify-center gap-4 [box-shadow:0_4px_14.8px_0_#0000001c] overlock">

            <div className="w-fit flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-10 font-thin">
                <HeaderLink
                    reference={homeLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(homeLinkRef)}
                    onClick={templateMode !== 'editing' ? () => scrollToElement(IDs.B1) : undefined}
                    className={`${templateMode !== "editing" && "cursor-pointer"}`}
                >
                    {(templateData.data as Basic2TemplateData).home.title}
                </HeaderLink>

                <HeaderLink
                    reference={aboutLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(aboutLinkRef)}
                    onClick={templateMode !== 'editing' ? () => scrollToElement(IDs.ABOUT) : undefined}
                    className={`${templateMode !== "editing" && "cursor-pointer"}`}
                >
                    {(templateData.data as Basic2TemplateData).about.title}
                </HeaderLink>

                <HeaderLink
                    reference={workLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(workLinkRef)}
                    onClick={templateMode !== 'editing' ? () => scrollToElement(IDs.PROJECTS) : undefined}
                    className={`${templateMode !== "editing" && "cursor-pointer"}`}
                >
                    {(templateData.data as Basic2TemplateData).work.title}
                </HeaderLink>

                <HeaderLink
                    reference={whatIdoLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(whatIdoLinkRef)}
                    onClick={templateMode !== 'editing' ? () => scrollToElement(IDs.SKILLS) : undefined}
                    className={`${templateMode !== "editing" && "cursor-pointer"}`}
                >
                    {(templateData.data as Basic2TemplateData).skills.title}
                </HeaderLink>

                <HeaderLink onClick={templateMode !== 'editing' ? () => scrollToElement(IDs.CONTACT) : undefined} className="cursor-pointer">
                    {"Contact"}
                </HeaderLink>
            </div>

        </header>
    );
};

const HeaderLink: React.FC<SpanProps> = ({ className, children, reference, ...props }) => {

    return (
        <span
            className={`outline-none hidden md:block hover:text-neutral-400/40 duration-300 ${className}`}
            {...props}
            ref={reference}
        >
            {children}
        </span>
    );
};
