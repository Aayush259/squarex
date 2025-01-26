"use client";
import { FaArrowRight } from "react-icons/fa6";
import Basic2Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RefObject, useRef } from "react";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { restoreCursorPosition } from "@/utils/funcs";
import { Basic2TemplateData } from "@/utils/interfaces";

const Basic2Hero = () => {

    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);
    const nameRef = useRef<HTMLSpanElement>(null);
    const roleRef = useRef<HTMLSpanElement>(null);
    const bioRef = useRef<HTMLSpanElement>(null);
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
                    home: {
                        ...(templateData?.data as Basic2TemplateData).home,
                        name: nameRef.current?.textContent || "",
                        role: roleRef.current?.textContent || "",
                        bio: bioRef.current?.textContent || "",
                    }
                }
            }));

            // Restore the cursor position
            restoreCursorPosition(ref.current, cursorPosition, selection);
        }
    };

    if (!templateData?.data) return null;

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center px-5 py-12 md:px-36 outfit text-lg text-center">
            <span
                ref={nameRef}
                contentEditable={templateMode === "editing"}
                suppressContentEditableWarning
                onInput={() => handleSectionChange(nameRef)}
                className="block outline-none"
            >
                {(templateData?.data as Basic2TemplateData).home.name}
            </span>

            <span
                ref={roleRef}
                contentEditable={templateMode === "editing"}
                suppressContentEditableWarning
                onInput={() => handleSectionChange(roleRef)}
                className="block outline-none my-8 text-4xl md:text-9xl font-semibold aldrich"
            >
                {(templateData?.data as Basic2TemplateData).home.role}
            </span>

            <span
                ref={bioRef}
                contentEditable={templateMode === "editing"}
                suppressContentEditableWarning
                onInput={() => handleSectionChange(bioRef)}
                className="block outline-none w-[450px] max-w-[90vw]"
            >
                {(templateData?.data as Basic2TemplateData).home.bio}
            </span>

            <Basic2Button className="text-sm !my-6">
                {"Let's Talk"}
                <FaArrowRight size={16} />
            </Basic2Button>
        </section>
    );
};

export default Basic2Hero;
