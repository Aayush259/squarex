import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { restoreCursorPosition } from "@/utils/funcs";
import { Intermediate1TemplateData, ITrackerFunctions } from "@/utils/interfaces";
import { IoIosClose } from "react-icons/io";
import { IDs } from "@/utils/helper";

const Intermediate1Projects: React.FC<ITrackerFunctions> = ({ trackProjectClick }) => {

    const id = useId();     // Unique identifier for the component
    const dispatch = useDispatch();

    const templateMode = useSelector(selectTemplateMode);    // Stores current mode of template (e.g., editing, reviewing, etc.)
    const templateData = useSelector(selectTemplateData);   // Stores portfolio template data

    const [active, setActive] = useState<{ idx: number, name: string, description: string, image: string, url: string, gitHubLink: string } | boolean | null>(null);  // Active is the project that is in view.

    const ref = useRef<HTMLDivElement>(null);
    const projectRefs = useRef<{ name: HTMLSpanElement | null; description: HTMLSpanElement | null; url: HTMLSpanElement | null; gitHubLink: HTMLInputElement | null; image: HTMLInputElement | null; }[]>([]);

    // Function to handle project change
    const handleProjectsChange = (index: number, field: keyof Intermediate1TemplateData['projects'][number]) => {
        const ref = projectRefs.current[index]?.[field as keyof typeof projectRefs.current[number]];
        if (!ref || !templateData?.data) return;

        const selection = window.getSelection();

        if (!selection) return;

        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;

        const updatedProjects = [...(templateData.data as Intermediate1TemplateData).projects];
        updatedProjects[index] = {
            ...updatedProjects[index],
            [field]: ref.textContent || "",
        };

        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Intermediate1TemplateData),
                projects: updatedProjects,
            }
        }));

        // Retain the active project state with updated values
        if (active && typeof active === "object" && active.idx === index) {
            setActive({
                ...updatedProjects[index],
                idx: index,
            });
        }

        restoreCursorPosition(ref, cursorPosition, selection);
    };

    // Function to handle project image change
    const handleProjectImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        if (!templateData?.data) return;
        const file = e.target.files?.[0];

        if (file && file.type.startsWith("image/")) {
            const updatedProjects = [...(templateData.data as Intermediate1TemplateData).projects];
            updatedProjects[index] = {
                ...updatedProjects[index],
                image: URL.createObjectURL(file),
            };

            dispatch(setTemplateData({
                ...templateData,
                data: {
                    ...(templateData.data as Intermediate1TemplateData),
                    projects: updatedProjects,
                }
            }));

            if (active && typeof active === "object" && active.idx === index) {
                setActive({
                    ...updatedProjects[index],
                    idx: index,
                });
            }
        };
    };

    // Function to add a new project
    const addProject = () => {
        if (!templateData?.data) return;

        const newProject: Intermediate1TemplateData['projects'][number] = {
            name: "Project Name",
            url: "",
            description: "Project Description",
            image: "/slider2.jpg",
            gitHubLink: "",
        };

        const updatedProjects = [...(templateData.data as Intermediate1TemplateData).projects, newProject];

        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Intermediate1TemplateData),
                projects: updatedProjects,
            }
        }));
    };

    // Function to remove a project
    const removeProject = (index: number) => {
        if (!templateData?.data) return;
        const updatedProjects = [...(templateData.data as Intermediate1TemplateData).projects];
        updatedProjects.splice(index, 1);
        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Intermediate1TemplateData),
                projects: updatedProjects,
            }
        }));
    };

    // Setting up useEffect to close active project when escape key is pressed.
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    // Setting up useEffect to close active project when clicking outside of it.
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            setActive(null);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref]);

    if (!templateData?.data) return null;

    return (
        <section id={IDs.PROJECTS}>
            <div className="pt-10 pb-20 relative bg-black">
                <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b text-white bg-opacity-50 pb-6">
                    {"Crafting Skills Through Projects"}
                </h2>

                <AnimatePresence>
                    {active && typeof active === "object" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 h-full w-full z-10"
                            onClick={() => setActive(null)}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {active && typeof active === "object" ? (
                        <div className="fixed inset-0  grid place-items-center z-[100]">
                            <motion.button
                                key={`button-${active.idx}-${id}`}
                                layout
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.05,
                                    },
                                }}
                                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                                onClick={() => setActive(null)}
                            >
                                <motion.svg
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: {
                                            duration: 0.05,
                                        },
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-black"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M18 6l-12 12" />
                                    <path d="M6 6l12 12" />
                                </motion.svg>
                            </motion.button>
                            <motion.div
                                layoutId={`card-${active.idx}-${id}`}
                                ref={ref}
                                className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                            >
                                <motion.div layoutId={`image-${active.idx}-${id}`}>
                                    {
                                        templateMode === "editing" && (
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleProjectImageChange(active.idx, e)}
                                                ref={(el: HTMLInputElement | null) => {
                                                    if (el) projectRefs.current[active.idx].image = el;
                                                }}
                                            />
                                        )
                                    }

                                    <Image
                                        priority
                                        width={200}
                                        height={200}
                                        src={active.image}
                                        alt={active.name}
                                        className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                        onClick={() => {
                                            if (templateMode === "editing") {
                                                projectRefs.current[active.idx].image?.click();
                                            }
                                        }}
                                    />
                                </motion.div>

                                <div>
                                    <div className="flex justify-between items-start p-4">
                                        <div className="">
                                            <motion.p
                                                layoutId={`title-${active.idx}-${id}`}
                                                className="font-bold text-neutral-700 dark:text-neutral-200"
                                            >
                                                <span
                                                    ref={(el: HTMLSpanElement | null) => {
                                                        if (el) projectRefs.current[active.idx].name = el
                                                    }}
                                                    contentEditable={templateMode === "editing"}
                                                    suppressContentEditableWarning
                                                    onInput={() => handleProjectsChange(active.idx, "name")}
                                                    className="outline-none"
                                                >
                                                    {active.name}
                                                </span>
                                            </motion.p>
                                            <motion.a
                                                href={active.gitHubLink}
                                                layoutId={`description-${active.idx}-${id}`}
                                                className="text-neutral-600 dark:text-neutral-400 my-2 underline underline-offset-4 hover:opacity-60"
                                                onClick={(e) => templateMode === "editing" || templateMode === "reviewing" || templateMode === "checking" ? e.preventDefault() : undefined}
                                            >
                                                {"View on Github"}
                                            </motion.a>
                                        </div>

                                        <motion.a
                                            layoutId={`button-${active.idx}-${id}`}
                                            href={active.url}
                                            target="_blank"
                                            className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white hover:bg-white hover:text-green-500 duration-200"
                                            onClick={(e) => templateMode === "editing" || templateMode === "reviewing" || templateMode === "checking" ? e.preventDefault() : undefined}
                                        >
                                            {"View Live"}
                                        </motion.a>
                                    </div>

                                    {
                                        templateMode === "editing" && (
                                            <div className="flex items-center gap-2 px-4 py-2 text-white">
                                                <span
                                                    ref={(el: HTMLSpanElement | null) => {
                                                        if (el) projectRefs.current[active.idx].gitHubLink = el as unknown as HTMLInputElement
                                                    }}
                                                    className="outline-none border border-[var(--primary)] rounded-full max-w-[70vw] overflow-hidden whitespace-nowrap text-sm py-1 px-3 w-[200px]"
                                                    contentEditable={templateMode === "editing"}
                                                    suppressContentEditableWarning
                                                    onInput={() => handleProjectsChange(active.idx, "gitHubLink")}
                                                >{active.gitHubLink}</span>

                                                <span
                                                    ref={(el: HTMLSpanElement | null) => {
                                                        if (el) projectRefs.current[active.idx].url = el
                                                    }}
                                                    className="outline-none border border-[var(--primary)] rounded-full max-w-[70vw] overflow-hidden whitespace-nowrap text-sm py-1 px-3 w-[200px]"
                                                    contentEditable={templateMode === "editing"}
                                                    suppressContentEditableWarning
                                                    onInput={() => handleProjectsChange(active.idx, "url")}
                                                >{active.url}</span>
                                            </div>
                                        )
                                    }

                                    <div className="pt-4 relative px-4">
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                        >
                                            <span
                                                ref={(el: HTMLSpanElement | null) => {
                                                    if (el) projectRefs.current[active.idx].name = el
                                                }}
                                                contentEditable={templateMode === "editing"}
                                                suppressContentEditableWarning
                                                onInput={() => handleProjectsChange(active.idx, "description")}
                                                className="outline-none"
                                            >
                                                {active.description}
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : null}
                </AnimatePresence>

                <ul className="max-w-2xl mx-auto my-4 w-full gap-4">
                    {(templateData.data as Intermediate1TemplateData).projects.map((project, idx) => {
                        if (!projectRefs.current[idx]) {
                            projectRefs.current[idx] = { name: null, url: null, description: null, image: null, gitHubLink: null };
                        }

                        return (
                            <motion.div
                                layoutId={`card-${idx}-${id}`}
                                key={`card-${idx}-${id}`}
                                onClick={() => {
                                    trackProjectClick();
                                    setActive({ idx: idx, name: project.name, description: project.description, url: project.url, image: project.image, gitHubLink: project.gitHubLink });
                                }}
                                className="w-[90vw] mx-auto md:w-auto my-4 md:my-0 p-4 flex flex-col md:flex-row justify-between md:items-center md:hover:bg-neutral-50 md:dark:hover:bg-neutral-800 rounded-xl cursor-pointer relative"
                            >
                                {
                                    (templateMode === "editing" && (templateData.data as Intermediate1TemplateData).projects.length > 1) && (
                                        <button className="text-[#303030] absolute right-0 top-1/2 -translate-y-1/2 translate-x-full bg-white rounded-full p-[1px] duration-300 hover:bg-neutral-400 z-20" onClick={(e) => {
                                            e.stopPropagation();
                                            removeProject(idx)
                                        }}>
                                            <IoIosClose size={24} />
                                        </button>
                                    )
                                }

                                <div className="flex gap-4 flex-col md:flex-row ">
                                    <motion.div layoutId={`image-${idx}-${id}`}>
                                        <Image
                                            width={100}
                                            height={100}
                                            src={project.image}
                                            alt={project.name}
                                            className="h-40 w-[90vw] mx-auto md:h-14 md:w-14 rounded-lg object-cover object-top"
                                        />
                                    </motion.div>
                                    <div className="overflow-hidden">
                                        <motion.p
                                            layoutId={`title-${idx}-${id}`}
                                            className="font-medium text-neutral-800 dark:text-neutral-200 text-left"
                                        >
                                            {project.name}
                                        </motion.p>
                                        <motion.p
                                            layoutId={`description-${idx}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400 text-left md:max-w-[450px] overflow-ellipsis overflow-hidden whitespace-nowrap"
                                        >
                                            <span
                                                className="outline-none"
                                                ref={(el: HTMLSpanElement | null) => {
                                                    if (el) projectRefs.current[idx].description = el
                                                }}
                                                contentEditable={templateMode === "editing"}
                                                suppressContentEditableWarning
                                                onInput={() => handleProjectsChange(idx, "description")}
                                            >
                                                {project.description}
                                            </span>
                                        </motion.p>
                                    </div>
                                </div>
                                <motion.button
                                    layoutId={`button-${idx}-${id}`}
                                    className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                                >
                                    {"View"}
                                </motion.button>
                            </motion.div>
                        )
                    })}
                </ul>

                <div className="max-w-2xl mx-auto">
                    {
                        templateMode === "editing" && (
                            <motion.button
                                className="px-4 py-2 ml-auto block text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                                onClick={addProject}
                            >
                                {"Add Project"}
                            </motion.button>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default Intermediate1Projects;
