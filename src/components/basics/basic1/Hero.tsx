"use client";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { restoreCursorPosition } from "@/utils/funcs";
import Image from "next/image";
import { ChangeEvent, RefObject, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Basic1Hero = () => {

    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);
    const nameRef = useRef<HTMLSpanElement>(null);
    const roleRef = useRef<HTMLSpanElement>(null);
    const bioRef = useRef<HTMLSpanElement>(null);
    const myWorkRef = useRef<HTMLSpanElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const handleSectionChange = (ref: RefObject<HTMLSpanElement | null>) => {
        if (!ref.current || !templateData?.basic1template) return;

        const selection = window.getSelection();

        if (selection) {
            // Save the current cursor position
            const range = selection.getRangeAt(0);
            const cursorPosition = range.startOffset;

            dispatch(setTemplateData({
                basic1template: {
                    ...templateData?.basic1template,
                    home: {
                        ...templateData?.basic1template.home,
                        name: nameRef.current?.textContent || "",
                        role: roleRef.current?.textContent || "",
                        bio: bioRef.current?.textContent || "",
                    },
                    work: {
                        ...templateData?.basic1template.work,
                        title: myWorkRef.current?.textContent || "",
                    }
                }
            }));

            // Restore the cursor position
            restoreCursorPosition(ref.current, cursorPosition, selection);
        }
    };

    const handleImageClick = () => {
        if (templateMode !== "editing" || !fileInputRef.current) return;
        fileInputRef.current.click();
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!templateData?.basic1template) return;
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            dispatch(setTemplateData({
                basic1template: {
                    ...templateData?.basic1template,
                    home: {
                        ...templateData?.basic1template.home,
                        image: URL.createObjectURL(file),
                    }
                }
            }));
        };
    };

    if (!templateData?.basic1template) return null;

    return (
        <section className="w-full bg-[#FFFFFF] px-5 pt-12 pb-20 md:px-36 md:pt-28 md:pb-28">
            <div className="flex items-center justify-center gap-8 md:gap-20 flex-col-reverse md:flex-row">
                <div>
                    <h1 className="text-2xl md:text-6xl font-semibold flex flex-col gap-2 md:gap-4">
                        <span>
                            {"Hi, I am "}
                            <span
                                className="outline-none"
                                ref={nameRef}
                                contentEditable={templateMode === "editing"}
                                suppressContentEditableWarning
                                onInput={() => handleSectionChange(nameRef)}
                            >{templateData.basic1template.home.name}</span>
                        </span>
                        <span
                            className="outline-none"
                            ref={roleRef}
                            contentEditable={templateMode === "editing"}
                            suppressContentEditableWarning
                            onInput={() => handleSectionChange(roleRef)}
                        >
                            {templateData.basic1template.home.role}
                        </span>
                    </h1>

                    <span
                        className="mt-4 md:mt-8 block outline-none"
                        ref={bioRef}
                        contentEditable={templateMode === "editing"}
                        suppressContentEditableWarning
                        onInput={() => handleSectionChange(bioRef)}
                    >
                        {templateData.basic1template.home.bio}
                    </span>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <Image
                    src={templateData.basic1template.home.image}
                    alt={templateData.basic1template.home.name}
                    width={300}
                    height={300}
                    className={`rounded-full w-[280px] h-[280px] md:h-[300px] md:w-[300px] object-cover object-top duration-300 ${templateMode === "editing" ? "cursor-pointer hover:opacity-70" : ""}`}
                    onClick={handleImageClick}
                />
            </div>

            <button className="mt-8 md:mt-0 bg-red-500 border-2 border-red-500 text-white rounded-sm py-1 px-8 font-semibold relative hover:text-red-500 duration-500 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0 before:rounded-sm before:bg-white before:duration-500 hover:before:w-full hover:before:left-0 disabled:opacity-50 disabled:cursor-default">
                <span
                    className="relative z-10 outline-none"
                    ref={myWorkRef}
                    contentEditable={templateMode === "editing"}
                    suppressContentEditableWarning
                    onInput={() => handleSectionChange(myWorkRef)}
                >{templateData.basic1template.work.title}</span>
            </button>
        </section>
    );
};

export default Basic1Hero;
