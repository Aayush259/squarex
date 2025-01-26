"use client";
import { IDs } from "@/utils/helper";
import Image from "next/image";
import Basic2Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectTemplateData, selectTemplateMode, setTemplateData } from "@/store/templateSlice";
import { ChangeEvent, RefObject, useRef } from "react";
import { restoreCursorPosition } from "@/utils/funcs";
import { Basic2TemplateData } from "@/utils/interfaces";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";

const Basic2Projects = () => {

    const templateMode = useSelector(selectTemplateMode);
    const templateData = useSelector(selectTemplateData);
    const dispatch = useDispatch();
    const router = useRouter();

    const myWorkRef = useRef<HTMLSpanElement>(null);
    const projectRefs = useRef<{ title: HTMLSpanElement | null; url: HTMLSpanElement | null; description: HTMLSpanElement | null; image: HTMLInputElement | null; }[]>([]);

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
                    work: {
                        ...(templateData.data as Basic2TemplateData).work,
                        title: myWorkRef.current?.textContent || "",
                    }
                }
            }));

            // Restore the cursor position
            restoreCursorPosition(ref.current, cursorPosition, selection);
        }
    };

    const handleProjectsChange = (index: number, field: keyof Basic2TemplateData['work']['projects'][number]) => {
        const ref = projectRefs.current[index]?.[field as keyof typeof projectRefs.current[number]];
        if (!ref || !templateData?.data) return;

        const selection = window.getSelection();

        if (!selection) return;

        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;

        const updatedProjects = [...(templateData.data as Basic2TemplateData).work.projects];
        updatedProjects[index] = {
            ...updatedProjects[index],
            [field]: ref.textContent || "",
        };

        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Basic2TemplateData),
                work: {
                    ...(templateData.data as Basic2TemplateData).work,
                    projects: updatedProjects,
                },
            }
        }));

        restoreCursorPosition(ref, cursorPosition, selection);
    };

    const handleProjectImageChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        if (!templateData?.data) return;
        const file = e.target.files?.[0];

        if (file && file.type.startsWith("image/")) {
            const updatedProjects = [...(templateData.data as Basic2TemplateData).work.projects];
            updatedProjects[index] = {
                ...updatedProjects[index],
                image: URL.createObjectURL(file),
            };

            dispatch(setTemplateData({
                ...templateData,
                data: {
                    ...(templateData.data as Basic2TemplateData),
                    work: {
                        ...(templateData.data as Basic2TemplateData).work,
                        projects: updatedProjects,
                    },
                }
            }));
        };
    };

    const addProject = () => {
        if (!templateData?.data) return;

        const newProject: Basic2TemplateData['work']['projects'][number] = {
            title: "Project Name",
            url: "/",
            description: "Project Description",
            image: "/slider2.jpg",
        };

        const updatedProjects = [...(templateData.data as Basic2TemplateData).work.projects, newProject];

        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Basic2TemplateData),
                work: {
                    ...(templateData.data as Basic2TemplateData).work,
                    projects: updatedProjects,
                },
            }
        }));
    };

    const removeProject = (index: number) => {
        if (!templateData?.data) return;
        const updatedProjects = [...(templateData.data as Basic2TemplateData).work.projects];
        updatedProjects.splice(index, 1);
        dispatch(setTemplateData({
            ...templateData,
            data: {
                ...(templateData.data as Basic2TemplateData),
                work: {
                    ...(templateData.data as Basic2TemplateData).work,
                    projects: updatedProjects,
                },
            }
        }));
    };

    if (!templateData?.data) return null;

    return (
        <section id={IDs.PROJECTS} className="w-full px-5 py-5 md:px-36 outfit">
            <span
                ref={myWorkRef}
                contentEditable={true}
                suppressContentEditableWarning
                onInput={() => handleSectionChange(myWorkRef)}
                className="block outline-none text-2xl font-semibold w-full"
            >
                {(templateData.data as Basic2TemplateData).work.title}
            </span>

            <div className="flex flex-col flex-wrap gap-10 md:flex-row md:items-center md:justify-between my-8">
                {
                    (templateData.data as Basic2TemplateData).work.projects.map((project, index) => {
                        if (!projectRefs.current[index]) {
                            projectRefs.current[index] = { title: null, url: null, description: null, image: null };
                        }

                        return (
                            <div key={index} className="w-[500px] max-w-full relative">
                                {
                                    (templateMode === "editing" && (templateData.data as Basic2TemplateData).work.projects.length > 1) && (
                                        <button className="text-[#303030] absolute right-1 top-1 bg-white rounded-full p-[1px] duration-300 hover:bg-neutral-400 z-20" onClick={() => removeProject(index)}>
                                            <IoIosClose size={34} />
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
                                    width={500}
                                    height={250}
                                    className={`w-full h-[330px] object-cover object-top rounded-xl duration-300 ${templateMode === "editing" ? "cursor-pointer hover:opacity-70" : ""}`}
                                    onClick={() => {
                                        if (templateMode === "editing") {
                                            projectRefs.current[index].image?.click();
                                        }
                                    }}
                                />

                                <div className="mx-1 flex items-center justify-between">
                                    <div>
                                        <span
                                            ref={(el: HTMLSpanElement | null) => {
                                                if (el) projectRefs.current[index].title = el
                                            }}
                                            contentEditable={templateMode === "editing"}
                                            suppressContentEditableWarning
                                            onInput={() => handleProjectsChange(index, "title")}
                                            className="block outline-none font-semibold mt-2.5"
                                        >
                                            {project.title}
                                        </span>

                                        <span className="text-xs">
                                            {project.description}
                                        </span>
                                    </div>

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

                                    <Basic2Button
                                        className="!bg-white !text-[#303030] hover:!text-white before:!bg-[#303030] h-full !px-4"
                                        onClick={() => {
                                            if (templateMode === "done") {
                                                router.push(project.url);
                                            }
                                        }}
                                    >
                                        <FaArrowRight size={16} />
                                    </Basic2Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                templateMode === "editing" && (
                    <Basic2Button className="block border border-[var(--primary)] ml-auto mr-2 !rounded-lg before:!rounded-lg" onClick={addProject}>
                        {"Add Project"}
                    </Basic2Button>
                )
            }
        </section>
    );
};

export default Basic2Projects;
