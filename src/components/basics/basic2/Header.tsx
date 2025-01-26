"use client";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { restoreCursorPosition, scrollToElement } from "@/utils/funcs";
import { IDs } from "@/utils/helper";
import { Basic2TemplateData, SpanProps } from "@/utils/interfaces";
import { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Basic2Header() {

    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);
    const homeLinkRef = useRef<HTMLSpanElement | null>(null);
    const aboutLinkRef = useRef<HTMLSpanElement | null>(null);
    const workLinkRef = useRef<HTMLSpanElement | null>(null);
    const whatIdoLinkRef = useRef<HTMLSpanElement | null>(null);
    const [hamActive, setHamActive] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const dispatch = useDispatch();

    // State for hamburger button.

    const visibleThreshold = 100;

    // Function to handle the hamburger button's state.
    const handleHamburgerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setHamActive(prevHamState => !prevHamState);
    };

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

    useEffect(() => {
        const scrollContainer = document.getElementById(IDs.B1);
        if (scrollContainer) {
            setLastScrollY(scrollContainer.scrollTop);

            const handleScroll = () => {
                const currentScrollY = scrollContainer.scrollTop;
                if (currentScrollY > lastScrollY && currentScrollY > visibleThreshold) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
                setLastScrollY(currentScrollY);
            };

            if (scrollContainer) {
                scrollContainer.addEventListener('scroll', handleScroll);
            }

            return () => {
                scrollContainer?.removeEventListener('scroll', handleScroll);
            };
        }
    }, [lastScrollY]);

    // Hides nav link when document is clicked or scrolled except nav.
    useEffect(() => {
        // This function hides the nav links if hamburger is active.
        const handleDocumentClick = () => {
            if (hamActive) {
                setHamActive(false);
            };
        };

        // Adding event listeners to document for click or scroll events to hide navlinks if hamburger is active.
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('scroll', handleDocumentClick);

        // Cleanup functions for event listeners on document.
        return () => {
            document.removeEventListener('click', handleDocumentClick);
            document.removeEventListener('scroll', handleDocumentClick);
        };
    });

    if (!templateData?.data) return null;

    return (
        <header className={`flex sticky top-0 left-0 z-50 bg-[#FFFFFF] py-5 px-10 md:items-center md:justify-center gap-4 [box-shadow:0_4px_14.8px_0_#0000001c] overlock duration-500 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>

            <button
                className="ml-auto h-full flex flex-col gap-1 items-center justify-center sm:hover:opacity-75 xl:hidden duration-300 relative z-10"
                onClick={handleHamburgerClick}
            >
                {
                    ['rotate-45 translate-y-2', 'opacity-0', '-rotate-45 -translate-y-[4px]'].map(twClassName => (
                        <div
                            key={twClassName}
                            className={`w-6 h-[2px] bg-[#303030] rounded duration-300 ${hamActive ? twClassName : ''}`}
                        />
                    ))
                }
            </button>

            <div className={`w-full absolute top-0 left-0 md:static md:w-fit flex flex-col md:flex-row md:items-center md:justify-center md:gap-10 font-thin duration-500 bg-[#FFFFFF] md:bg-transparent [box-shadow:0_4px_14.8px_0_#0000001c] md:shadow-none md:!translate-y-0 ${hamActive ? 'translate-y-[54px]' : '-translate-y-[150%]'}`}>
                <HeaderLink
                    reference={homeLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(homeLinkRef)}
                    onClick={templateMode !== 'editing' ? () => {setHamActive(false); scrollToElement(IDs.B1)} : undefined}
                    className={`border-b ${templateMode !== "editing" && "cursor-pointer"}`}
                >
                    {(templateData.data as Basic2TemplateData).home.title}
                </HeaderLink>

                <HeaderLink
                    reference={aboutLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(aboutLinkRef)}
                    onClick={templateMode !== 'editing' ? () => {setHamActive(false); scrollToElement(IDs.ABOUT)} : undefined}
                    className={`border-b ${templateMode !== "editing" && "cursor-pointer"}`}
                >
                    {(templateData.data as Basic2TemplateData).about.title}
                </HeaderLink>

                <HeaderLink
                    reference={workLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(workLinkRef)}
                    onClick={templateMode !== 'editing' ? () => {setHamActive(false); scrollToElement(IDs.PROJECTS)} : undefined}
                    className={`border-b ${templateMode !== "editing" && "cursor-pointer"}`}
                >
                    {(templateData.data as Basic2TemplateData).work.title}
                </HeaderLink>

                <HeaderLink
                    reference={whatIdoLinkRef}
                    contentEditable={templateMode === 'editing'}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(whatIdoLinkRef)}
                    onClick={templateMode !== 'editing' ? () => {setHamActive(false); scrollToElement(IDs.SKILLS)} : undefined}
                    className={`border-b ${templateMode !== "editing" && "cursor-pointer"}`}
                >
                    {(templateData.data as Basic2TemplateData).skills.title}
                </HeaderLink>

                {
                    templateMode !== 'editing' && <HeaderLink onClick={() => {setHamActive(false); scrollToElement(IDs.CONTACT)}} className="cursor-pointer">
                        {"Contact"}
                    </HeaderLink>
                }
            </div>

        </header>
    );
};

const HeaderLink: React.FC<SpanProps> = ({ className, children, reference, ...props }) => {

    return (
        <span
            className={`outline-none block w-full text-center border-x-0 border-[#303030]/20 md:border-none py-2.5 md:py-0 md:w-fit hover:text-neutral-400/40 duration-300 ${className}`}
            {...props}
            ref={reference}
        >
            {children}
        </span>
    );
};
