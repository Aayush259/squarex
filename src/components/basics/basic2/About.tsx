"use client";
import { IDs } from "@/utils/helper";
import Image from "next/image";
import Basic2Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { RefObject, useRef } from "react";
import { restoreCursorPosition } from "@/utils/funcs";
import { Basic2TemplateData } from "@/utils/interfaces";

const Basic2About = () => {

    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);
    const nameRef = useRef<HTMLSpanElement>(null);
    const desc1Ref = useRef<HTMLSpanElement>(null);
    const desc2Ref = useRef<HTMLSpanElement>(null);
    const dispatch = useDispatch();

    const handleSectionChange = (ref: RefObject<HTMLSpanElement | null>) => {
        if (!ref.current || !templateData?.data) return;

        const selection = window.getSelection();

        if (selection) {
            // Save the current cursor position
            const range = selection.getRangeAt(0);
            const cursorPosition = range.startOffset;

            dispatch(setTemplateData({
                ...templateData,
                data: {
                    ...(templateData.data as Basic2TemplateData),
                    about: {
                        ...(templateData?.data as Basic2TemplateData).about,
                        title: nameRef.current?.textContent || "",
                        descriptionPart1: desc1Ref.current?.textContent || "",
                        descriptionPart2: desc2Ref.current?.textContent || "",
                    }
                }
            }));

            // Restore the cursor position
            restoreCursorPosition(ref.current, cursorPosition, selection);
        }
    };

    if (!templateData?.data) return null;

    return (
        <section id={IDs.ABOUT} className="w-full px-5 py-5 md:pl-36 md:pr-20 outfit">
            <span
                ref={nameRef}
                contentEditable={templateMode === "editing"}
                suppressContentEditableWarning
                onInput={() => handleSectionChange(nameRef)}
                className="block outline-none text-2xl font-semibold w-full"
            >
                {(templateData?.data as Basic2TemplateData).about.title}
            </span>

            <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-center">
                <div>
                    <span
                        ref={desc1Ref}
                        contentEditable={templateMode === "editing"}
                        suppressContentEditableWarning
                        onInput={() => handleSectionChange(desc1Ref)}
                        className="block outline-none text-lg font-semibold my-7"
                    >
                        {(templateData?.data as Basic2TemplateData).about.descriptionPart1}
                    </span>

                    <span
                        ref={desc2Ref}
                        contentEditable={templateMode === "editing"}
                        suppressContentEditableWarning
                        onInput={() => handleSectionChange(desc2Ref)}
                        className="block outline-none"
                    >
                        {(templateData?.data as Basic2TemplateData).about.descriptionPart2}
                    </span>
                </div>
                <Image src="/templateImages/about_me.avif" alt="About me" width={500} height={200} className="w-[400px] max-w-[90%] object-cover object-top" />
            </div>

            <Basic2Button className="text-sm !my-6">
                {"Let's Talk"}
                <FaArrowRight size={16} />
            </Basic2Button>
        </section>
    );
};

export default Basic2About;
