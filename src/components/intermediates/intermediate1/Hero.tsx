import WavyBackground from "@/components/ui/WavyBackground";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { restoreCursorPosition } from "@/utils/funcs";
import { Intermediate1TemplateData } from "@/utils/interfaces";
import { RefObject, useRef, useState } from "react";
import { GoPencil } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function Intermediate1Hero() {

    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);

    const [editHeadlinesEnabled, setEditHeadlinesEnabled] = useState<boolean>(false);
    const nameRef = useRef<HTMLSpanElement>(null);
    const headlinesRef = useRef<(HTMLSpanElement | null)[]>([]);
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
                    ...(templateData.data as Intermediate1TemplateData),
                    home: {
                        ...(templateData?.data as Intermediate1TemplateData).home,
                        name: nameRef.current?.textContent || "",
                    }
                }
            }));

            // Restore the cursor position
            restoreCursorPosition(ref.current, cursorPosition, selection);
        }
    };

    const handleHeadlinesChange = (index: number) => {
        const ref = headlinesRef.current[index];
        if (!ref || !templateData?.data) return;

        const selection = window.getSelection();

        if (!selection) return;

        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;

        const updatedHeadlines = [...(templateData?.data as Intermediate1TemplateData).home.headlines];
        updatedHeadlines[index] = ref.textContent || "";

        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Intermediate1TemplateData),
                home: {
                    ...(templateData?.data as Intermediate1TemplateData).home,
                    headlines: updatedHeadlines,
                }
            }
        }));

        restoreCursorPosition(ref, cursorPosition, selection);
    }

    if (!templateData?.data) return null;

    return (
        <WavyBackground className="max-w-4xl mx-auto pb-40">
            {
                editHeadlinesEnabled && <span className="fixed h-screen w-screen top-0 left-0 flex items-center justify-center bg-black/60 text-white z-50" onClick={() => setEditHeadlinesEnabled(false)}>
                    <button className="absolute rounded-full right-4 top-4 duration-300 hover:opacity-50" onClick={() => setEditHeadlinesEnabled(false)}>
                        <IoIosClose size={44} />
                    </button>
                    <span
                        className="block w-[500px] max-w-[95vw] rounded-xl bg-black overflow-hidden border border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {
                            (templateData.data as Intermediate1TemplateData).home.headlines.map((headline, idx) => <span
                                className="outline-none block border-y border-gray-700 overflow-hidden whitespace-nowrap py-3 px-6 w-full"
                                key={idx}
                                ref={(el: HTMLSpanElement | null) => {
                                    headlinesRef.current[idx] = el
                                }}
                                contentEditable={templateMode === "editing"}
                                suppressContentEditableWarning
                                onInput={() => handleHeadlinesChange(idx)}
                            >{headline}</span>)
                        }
                    </span>
                </span>
            }

            <p className="text-lg md:text-2xl lg:text-4xl text-center font-bold !text-white">{"Hi, I'm"}</p>
            <h1 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
                <span
                    className="outline-none"
                    ref={nameRef}
                    contentEditable={templateMode === "editing"}
                    suppressContentEditableWarning
                    onInput={() => handleNameChange(nameRef)}
                >{(templateData.data as Intermediate1TemplateData).home.name}</span>
            </h1>

            <p className="relative text-base md:text-lg mt-6 text-white font-normal text-center flex">
                <button className="text-white absolute top-full left-1/2 -translate-x-1/2 translate-y-[200%] rounded-full duration-300 hover:opacity-70" onClick={() => setEditHeadlinesEnabled(true)}>
                    <GoPencil size={24} />
                </button>

                {
                    (templateData.data as Intermediate1TemplateData).home.headlines.map((headline, idx) => <span key={idx} className={`block absolute opacity-0 animate-txt-slide-${idx + 1} w-full`}>
                        {headline}
                    </span>)
                }
            </p>
        </WavyBackground>
    );
}