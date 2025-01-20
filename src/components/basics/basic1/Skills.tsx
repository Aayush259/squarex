"use client";
import { CgAsterisk } from "react-icons/cg";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import { IoIosClose } from "react-icons/io";
import { restoreCursorPosition } from "@/utils/funcs";
import { IDs } from "@/utils/helper";

const Basic1Skills = () => {

    const [editEnabled, setEditEnabled] = useState<boolean>(false);
    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);
    const dispatch = useDispatch();

    // Ref for managing skill elements
    const skillRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const handleSkillChange = (index: number) => {
        const ref = skillRefs.current[index];
        if (!ref || !templateData?.basic1template) return;

        const selection = window.getSelection();

        if (!selection) return;

        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;

        const updatedSkills = [...templateData.basic1template.skills];
        updatedSkills[index] = ref.textContent || "";

        dispatch(
            setTemplateData({
                basic1template: {
                    ...templateData.basic1template,
                    skills: updatedSkills,
                },
            })
        );

        restoreCursorPosition(ref, cursorPosition, selection);
    };

    if (!templateData?.basic1template) return;

    return (
        <>
            {
                (editEnabled && templateMode === "editing") && (
                    <div className="flex items-center gap-2 my-10 px-4 relative">
                        <button className="text-[var(--primary)] absolute right-0 top-0 -translate-y-1/2 duration-300 hover:opacity-50" onClick={() => setEditEnabled(false)}>
                            <IoIosClose size={44} />
                        </button>
                        {
                            templateData.basic1template.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="outline-none border border-[var(--primary)] rounded-full max-w-[70vw] overflow-hidden whitespace-nowrap text-sm py-1 px-3 w-[200px]"
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
                    <Button className="block border border-[var(--primary)] my-10 ml-2 mr-auto !rounded-lg before:!rounded-lg" onClick={() => setEditEnabled(true)}>
                        {"Edit Skills"}
                    </Button>
                )
            }

            <section id={IDs.SKILLS} className="flex items-center overflow-hidden relative z-20 my-10 w-screen text-3xl whitespace-nowrap text-white bg-[var(--primary)] font-semibold">
                <div className="animate-scroll1 flex shrink-0 gap-4 min-w-[100vw] w-fit flex-nowrap xs:space-x-32 space-x-16 my-8 py-6 xs:py-8 xs:px-20 px-8">
                    {
                        templateData.basic1template.skills.map((skill, index) => (
                            <div className="flex items-start justify-center space-y-4" key={index}>
                                <CgAsterisk size={40} className="animate-spin2" />
                                <p className="ml-5">
                                    {skill}
                                </p>
                            </div>
                        ))
                    }
                </div>
                <div className="animate-scroll2 flex shrink-0 gap-4 w-fit flex-nowrap xs:space-x-32 space-x-16 my-8 py-6 xs:py-8 xs:px-20 px-8">
                    {
                        templateData.basic1template.skills.map((skill, index) => (
                            <div className="flex items-start justify-center space-y-4" key={index}>
                                <CgAsterisk size={50} className="animate-spin2" />
                                <p className="ml-5">
                                    {skill}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    );
};

export default Basic1Skills;
