"use client";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { restoreCursorPosition } from "@/utils/funcs";
import { IDs } from "@/utils/helper";
import { Basic2TemplateData } from "@/utils/interfaces";
import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Basic2Button from "./Button";
import { IoIosClose } from "react-icons/io";

const Basic2WhatiDo = () => {

    const skills = [
        "UI/UX Design", "Photoshop", "Illustrator", "Figma", "Web Design", "Logo Design"
    ]

    const [editEnabled, setEditEnabled] = useState<boolean>(false);
    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);
    const dispatch = useDispatch();

    const titleRef = useRef<HTMLSpanElement | null>(null);
    const subtitleRef = useRef<HTMLSpanElement | null>(null);
    // Ref for managing skill elements
    const skillRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
                    skills: {
                        ...(templateData?.data as Basic2TemplateData).skills,
                        title: titleRef.current?.textContent || "",
                        subtitle: subtitleRef.current?.textContent || "",
                    }
                }
            }));

            // Restore the cursor position
            restoreCursorPosition(ref.current, cursorPosition, selection);
        }
    };

    const handleSkillChange = (index: number) => {
        const ref = skillRefs.current[index];
        if (!ref || !templateData?.data) return;

        const selection = window.getSelection();

        if (!selection) return;

        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;

        const updatedSkills = [...(templateData.data as Basic2TemplateData).skills.skills];
        updatedSkills[index] = ref.textContent || "";

        dispatch(
            setTemplateData({
                ...templateData,
                data: {
                    ...(templateData.data as Basic2TemplateData),
                    skills: {
                        ...(templateData.data as Basic2TemplateData).skills,
                        skills: updatedSkills,
                    },
                }
            })
        );

        restoreCursorPosition(ref, cursorPosition, selection);
    };

    if (!templateData?.data) return;

    return (
        <section id={IDs.SKILLS} className="w-full md:min-h-screen mt-5 px-5 py-5 md:px-36 outfit relative overflow-hidden">
            <Image src="/templateImages/skills_bg.avif" alt="Skills" width={500} height={500} className="object-cover object-center w-full h-full absolute top-0 left-0" />

            {
                (editEnabled && templateMode === "editing") && (
                    <div className="flex items-center flex-wrap gap-2 my-10 px-4 relative z-10 md:w-1/2">
                        <button className="text-white absolute right-0 top-0 -translate-y-full md:-translate-y-1/2 duration-300 hover:opacity-50" onClick={() => setEditEnabled(false)}>
                            <IoIosClose size={44} />
                        </button>
                        {
                            (templateData.data as Basic2TemplateData).skills.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="outline-none border border-neutral-400 text-white rounded-full max-w-[70vw] overflow-hidden whitespace-nowrap text-sm py-1 px-3 w-[150px] md:w-[200px]"
                                    ref={(el: HTMLSpanElement | null) => {
                                        skillRefs.current[index] = el
                                    }}
                                    contentEditable={templateMode === "editing"}
                                    suppressContentEditableWarning
                                    onInput={() => handleSkillChange(index)}
                                >{skill}</span>
                            ))
                        }
                    </div>
                )
            }

            {
                (!editEnabled && templateMode === "editing") && (
                    <Basic2Button className="z-10 block border border-white my-10 ml-2 mr-auto !rounded-lg before:!rounded-lg" onClick={() => setEditEnabled(true)}>
                        {"Edit Skills"}
                    </Basic2Button>
                )
            }

            <div className="w-full md:min-h-screen flex flex-col md:flex-row items-center justify-items-center md:justify-between text-neutral-300 relative z-10">
                <div className="md:w-1/2">
                    <span
                        ref={titleRef}
                        contentEditable={true}
                        suppressContentEditableWarning
                        onInput={() => handleSectionChange(titleRef)}
                        className="block outline-none text-2xl font-semibold w-full"
                    >
                        {(templateData.data as Basic2TemplateData).skills.title}
                    </span>

                    <span
                        ref={subtitleRef}
                        contentEditable={true}
                        suppressContentEditableWarning
                        onInput={() => handleSectionChange(subtitleRef)}
                        className="block outline-none my-8 text-2xl md:text-6xl font-semibold ![line-height:1.2]"
                    >
                        {(templateData.data as Basic2TemplateData).skills.subtitle}
                    </span>
                </div>

                <div className="md:w-1/2 md:rotate-90 flex items-center relative z-20 my-10 w-full text-3xl whitespace-nowrap text-white font-semibold">
                    <div className="animate-scroll1 flex shrink-0 gap-4 min-w-[100vw] w-fit flex-nowrap xs:space-x-32 space-x-16 my-8 py-6 xs:py-8 xs:px-20 px-8">
                        {
                            (templateData.data as Basic2TemplateData).skills.skills.map((skill, index) => (
                                <div className="flex items-start justify-center space-y-4 md:-rotate-90" key={index}>
                                    <p className="ml-5 md:scale-[1.5] bg-white/10 p-2 rounded-xl">
                                        {skill}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="animate-scroll2 flex shrink-0 gap-4 w-fit flex-nowrap xs:space-x-32 space-x-16 my-8 py-6 xs:py-8 xs:px-20 px-8">
                        {
                            (templateData.data as Basic2TemplateData).skills.skills.map((skill, index) => (
                                <div className="flex items-start justify-center space-y-4 md:-rotate-90" key={index}>
                                    <p className="ml-5 md:scale-[1.5] bg-white/10 p-2 rounded-xl">
                                        {skill}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Basic2WhatiDo;
