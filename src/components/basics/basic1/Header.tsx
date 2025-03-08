"use client";
import { useState, useRef, RefObject } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { restoreCursorPosition, scrollToElement } from "@/utils/funcs";
import { IDs } from "@/utils/helper";
import { Basic1TemplateData } from "@/utils/interfaces";

export default function Basic1Header() {

    const dispatch = useDispatch();

    const templateMode = useSelector(selectTemplateMode);   // Stores current mode of template (e.g., editing, reviewing, etc.)
    const templateData = useSelector(selectTemplateData);   // Stores portfolio template data

    // Refs for managing header elements
    const homeLinkRef = useRef<HTMLSpanElement | null>(null);
    const workLinkRef = useRef<HTMLSpanElement | null>(null);

    // State to manage sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    // Function to handle section's name change
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
                    ...templateData.data as Basic1TemplateData,
                    home: {
                        ...(templateData?.data as Basic1TemplateData).home,
                        title: homeLinkRef.current?.textContent || "",
                    },
                    work: {
                        ...(templateData?.data as Basic1TemplateData).work,
                        title: workLinkRef.current?.textContent || "",
                    }
                }
            }));

            // Restore the cursor position
            restoreCursorPosition(ref.current, cursorPosition, selection);
        }
    };

    if (!templateData?.data) return null;

    return (
        <>
            <header className="flex sticky top-0 left-0 z-50 bg-[#FFFFFF] py-5 px-10 md:items-center md:justify-end gap-4 md:gap-10 text-lg">
                <button className="md:hidden w-fit ml-auto outline-none" onClick={() => setIsSidebarOpen(true)}>
                    <RxHamburgerMenu size={24} />
                </button>

                {/* Home Link */}
                <span
                    ref={homeLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(homeLinkRef)}
                    className={`outline-none hidden md:block font-semibold hover:text-red-500 duration-300 ${templateMode !== "editing" && "cursor-pointer"}`}
                    onClick={templateMode !== 'editing' ? () => scrollToElement(IDs.B1) : undefined}
                >
                    {(templateData.data as Basic1TemplateData).home.title}
                </span>

                {/* Work Link */}
                <span
                    ref={workLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(workLinkRef)}
                    className={`outline-none hidden md:block font-semibold hover:text-red-500 duration-300 ${templateMode !== "editing" && "cursor-pointer"}`}
                    onClick={templateMode !== 'editing' ? () => scrollToElement(IDs.B1, IDs.PROJECTS) : undefined}
                >
                    {(templateData.data as Basic1TemplateData).work.title}
                </span>

                {/* Contact Link */}
                <span
                    className={`outline-none hidden md:block font-semibold hover:text-red-500 duration-300 ${templateMode !== "editing" && "cursor-pointer"}`}
                    onClick={templateMode !== 'editing' ? () => scrollToElement(IDs.B1, IDs.CONTACT) : undefined}
                >
                    {"Contact"}
                </span>
            </header>

            <div className={`fixed z-[60] py-5 px-10 top-0 w-screen h-screen bg-white ${isSidebarOpen ? "left-0" : "left-full"} duration-300`}>
                <button className="ml-auto mb-10 outline-none w-fit block" onClick={() => setIsSidebarOpen(false)}>
                    <IoCloseOutline size={24} />
                </button>

                {/* Home Link */}
                <span
                    ref={homeLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(homeLinkRef)}
                    className="outline-none block w-full my-6 text-lg text-center font-semibold duration-300"
                    onClick={templateMode !== 'editing' ? () => { scrollToElement(IDs.B1); setIsSidebarOpen(false) } : undefined}
                >
                    {(templateData.data as Basic1TemplateData).home.title}
                </span>

                {/* Work Link */}
                <span
                    ref={workLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(workLinkRef)}
                    className="outline-none block w-full my-6 text-lg text-center font-semibold duration-300"
                    onClick={templateMode !== 'editing' ? () => { scrollToElement(IDs.B1, IDs.PROJECTS); setIsSidebarOpen(false) } : undefined}
                >
                    {(templateData.data as Basic1TemplateData).work.title}
                </span>

                {/* Contact Link for mobile */}
                <span 
                className="block w-full my-6 text-lg text-center font-semibold duration-300"
                    onClick={templateMode !== 'editing' ? () => { scrollToElement(IDs.B1, IDs.CONTACT); setIsSidebarOpen(false) } : undefined}
                >
                    {"Contact"}
                </span>
            </div>
        </>
    );
};
