"use client";
import { ChangeEvent, RefObject, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDs } from "@/utils/helper";
import { restoreCursorPosition } from "@/utils/funcs";
import { Basic1TemplateData, ITrackerFunctions } from "@/utils/interfaces";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";

const Basic1Projects: React.FC<ITrackerFunctions> = ({ trackProjectClick }) => {
    
    const dispatch = useDispatch();

    const templateMode = useSelector(selectTemplateMode);   // Stores current mode of template (e.g., editing, reviewing, etc.)
    const templateData = useSelector(selectTemplateData);   // Stores portfolio template data

    // Refs for managing project elements
    const myWorkRef = useRef<HTMLSpanElement>(null);
    const projectRefs = useRef<{ title: HTMLSpanElement | null; url: HTMLSpanElement | null; description: HTMLSpanElement | null; image: HTMLInputElement | null; }[]>([]);

    // Function to handle section change
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
                    ...(templateData.data as Basic1TemplateData),
                    work: {
                        ...(templateData.data as Basic1TemplateData).work,
                        title: myWorkRef.current?.textContent || "",
                    }
                }
            }));

            // Restore the cursor position
            restoreCursorPosition(ref.current, cursorPosition, selection);
        }
    };

    // Function to handle project changes
    const handleProjectsChange = (index: number, field: keyof Basic1TemplateData['work']['projects'][number]) => {
        const ref = projectRefs.current[index]?.[field as keyof typeof projectRefs.current[number]];
        if (!ref || !templateData?.data) return;

        const selection = window.getSelection();

        if (!selection) return;

        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;

        const updatedProjects = [...(templateData.data as Basic1TemplateData).work.projects];
        updatedProjects[index] = {
            ...updatedProjects[index],
            [field]: ref.textContent || "",
        };

        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Basic1TemplateData),
                work: {
                    ...(templateData.data as Basic1TemplateData).work,
                    projects: updatedProjects,
                },
            }
        }));

        restoreCursorPosition(ref, cursorPosition, selection);
    };

    // Function to handle project image change
    const handleProjectImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        if (!templateData?.data) return;
        const file = e.target.files?.[0];

        if (file && file.type.startsWith("image/")) {
            const updatedProjects = [...(templateData.data as Basic1TemplateData).work.projects];
            updatedProjects[index] = {
                ...updatedProjects[index],
                image: URL.createObjectURL(file),
            };

            dispatch(setTemplateData({
                ...templateData,
                data: {
                    ...(templateData.data as Basic1TemplateData),
                    work: {
                        ...(templateData.data as Basic1TemplateData).work,
                        projects: updatedProjects,
                    },
                }
            }));
        };
    };

    // Function to add a new project
    const addProject = () => {
        if (!templateData?.data) return;

        const newProject: Basic1TemplateData['work']['projects'][number] = {
            title: "Project Name",
            url: "/",
            description: "Project Description",
            image: "/slider2.jpg",
        };

        const updatedProjects = [...(templateData.data as Basic1TemplateData).work.projects, newProject];

        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Basic1TemplateData),
                work: {
                    ...(templateData.data as Basic1TemplateData).work,
                    projects: updatedProjects,
                },
            }
        }));
    };

    // Function to remove a project
    const removeProject = (index: number) => {
        if (!templateData?.data) return;
        const updatedProjects = [...(templateData.data as Basic1TemplateData).work.projects];
        updatedProjects.splice(index, 1);
        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Basic1TemplateData),
                work: {
                    ...(templateData.data as Basic1TemplateData).work,
                    projects: updatedProjects,
                },
            }
        }));
    };

    if (!templateData?.data) return null;

    return (
        <section id={IDs.PROJECTS} className="w-full px-5 py-5 md:px-36">
            <h2 className="text-xl md:text-2xl font-semibold">
                <span
                    className="outline-none"
                    ref={myWorkRef}
                    contentEditable={templateMode === "editing"}
                    suppressContentEditableWarning
                    onInput={() => handleSectionChange(myWorkRef)}
                >{(templateData.data as Basic1TemplateData).work.title}</span>
            </h2>

            {
                (templateData.data as Basic1TemplateData).work.projects.map((project, index) => {
                    if (!projectRefs.current[index]) {
                        projectRefs.current[index] = { title: null, url: null, description: null, image: null };
                    }

                    return (
                        <div key={index} className="w-full flex flex-col md:flex-row md:gap-8 my-8 relative">

                            {
                                (templateMode === "editing" && (templateData.data as Basic1TemplateData).work.projects.length > 1) && (
                                    <button className="text-[var(--primary)] absolute right-0 top-0 -translate-y-full md:-translate-y-1/2 duration-300 hover:opacity-50" onClick={() => removeProject(index)}>
                                        <IoIosClose size={44} />
                                    </button>
                                )
                            }

                            {
                                templateMode === "editing" && (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleProjectImageChange(index, e)}
                                        ref={(el: HTMLInputElement | null) => {
                                            if (el) projectRefs.current[index].image = el;
                                        }}
                                    />
                                )
                            }

                            <Image
                                src={project.image}
                                alt={project.title}
                                width={300}
                                height={300}
                                className={`rounded-xl object-cover object-top w-full md:w-[250px] h-[200px] duration-300 ${templateMode === "editing" ? "cursor-pointer hover:opacity-70" : ""}`}
                                onClick={() => {
                                    if (templateMode === "editing") {
                                        projectRefs.current[index].image?.click();
                                    }
                                }}
                            />

                            <div className="py-4">
                                <p className="font-semibold text-xl">
                                    <span
                                        ref={(el: HTMLSpanElement | null) => {
                                            if (el) projectRefs.current[index].title = el
                                        }}
                                        className="outline-none"
                                        contentEditable={templateMode === "editing"}
                                        suppressContentEditableWarning
                                        onInput={() => handleProjectsChange(index, "title")}
                                    >
                                        {project.title}
                                    </span>
                                </p>

                                <div className="flex gap-2 items-center mt-1 mb-2.5">
                                    <Link
                                        href={project.url}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            trackProjectClick();
                                            if (templateMode !== "editing") window.open(project.url, "_blank");
                                        }}
                                        className="w-fit text-xs border border-black bg-black text-white rounded-full py-1 px-3 block relative hover:text-black duration-500 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0 before:rounded-full before:bg-white before:duration-500 hover:before:w-full hover:before:left-0"
                                    >
                                        <span className="relative z-10">
                                            {"Visit here"}
                                        </span>
                                    </Link>

                                    {
                                        templateMode === "editing" && (
                                            <span
                                                ref={(el: HTMLSpanElement | null) => {
                                                    if (el) projectRefs.current[index].url = el
                                                }}
                                                className="outline-none border border-[var(--primary)] rounded-full max-w-[70vw] overflow-hidden whitespace-nowrap text-sm py-1 px-3 w-[200px]"
                                                contentEditable={templateMode === "editing"}
                                                suppressContentEditableWarning
                                                onInput={() => handleProjectsChange(index, "url")}
                                            >{project.url}</span>
                                        )
                                    }
                                </div>

                                <p className="max-w-[600px]">
                                    <span
                                        ref={(el: HTMLSpanElement | null) => {
                                            if (el) projectRefs.current[index].description = el
                                        }}
                                        className="outline-none"
                                        contentEditable={templateMode === "editing"}
                                        suppressContentEditableWarning
                                        onInput={() => handleProjectsChange(index, "description")}
                                    >
                                        {project.description}
                                    </span>
                                </p>
                            </div>
                        </div>
                    )
                })
            }

            {
                templateMode === "editing" && (
                    <Button className="block border border-[var(--primary)] ml-auto mr-2 !rounded-lg before:!rounded-lg" onClick={addProject}>
                        {"Add Project"}
                    </Button>
                )
            }
        </section>
    );
};

export default Basic1Projects;
