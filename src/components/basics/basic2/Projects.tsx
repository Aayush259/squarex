"use client";
import { IDs } from "@/utils/helper";
import Image from "next/image";
import Basic2Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

const Basic2Projects = () => {

    const projects = [
        {
            title: "HEED",
            description: "UI UX Case Study",
            image: "/templateImages/heed.avif",
            url: "/",
        },
        {
            title: "Fly way",
            description: "Travel Agency Website Design",
            image: "/templateImages/fly_Way.avif",
            url: "/",
        },
        {
            title: "Sushi Restaurant",
            description: "Social Media Poster Design",
            image: "/templateImages/sushi.avif",
            url: "/",
        },
        {
            title: "Shoppy Bag",
            description: "Shoppy Bag",
            image: "/templateImages/shoppy.avif",
            url: "/",
        },
    ]

    return (
        <section id={IDs.PROJECTS} className="w-full px-5 py-5 md:px-36 outfit">
            <p className="text-2xl font-semibold w-full">
                {"Selected Works"}
            </p>

            <div className="flex flex-col flex-wrap gap-10 md:flex-row md:items-center md:justify-between my-8">
                {
                    projects.map(project => (
                        <div key={project.title} className="w-[500px] max-w-full ">
                            <Image src={project.image} alt={project.title} width={500} height={250} className="w-full h-[330px] object-cover object-top rounded-xl" />

                            <div className="mx-1 flex items-center justify-between">
                                <div>
                                    <span className="block font-semibold mt-2.5">
                                        {project.title}
                                    </span>

                                    <span className="text-xs">
                                        {project.description}
                                    </span>
                                </div>

                                <Basic2Button className="!bg-white !text-[#303030] hover:!text-white before:!bg-[#303030] h-full !px-4">
                                    <FaArrowRight size={16} />
                                </Basic2Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Basic2Projects;
