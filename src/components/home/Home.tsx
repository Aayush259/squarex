"use client";
import { ITemplates, TemplateType } from "@/utils/interfaces";
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setMode, setSelectedTemplate } from "@/store/templateSlice";

export default function Home() {

    const templates: ITemplates[] = [
        {
            name: "basic1template",
            description: "A simple and clean template for beginners in their journey.",
            image: "/templates/basic1template.webp",
        }
    ];

    const router = useRouter();
    const dispatch = useDispatch();

    const redirectToTemplate = (templateName: TemplateType) => {
        dispatch(setMode("editing"));
        dispatch(setSelectedTemplate(templateName));
        router.push(`/template/${templateName}`);
    }

    return (
        <div className="w-full py-10 md:px-28 md:py-28 flex flex-col md:flex-row gap-8">
            {
                templates.map(template => (
                    <div key={template.name} className="overflow-hidden w-[450px] max-w-[95vw] mx-auto md:mx-0 p-0.5 rounded-lg bg-gradient-to-b from-transparent to-[var(--primary)]">
                        <div className="rounded-lg w-full bg-black pb-2 overflow-hidden">
                            <Image src={template.image} alt={template.name as string} width={450} height={350} className="w-full rounded-t-lg mx-auto h-auto md:h-[250px] object-cover object-center" />

                            <p className="text-lg my-8 px-4">
                                {template.description}
                            </p>

                            <Button className="block ml-auto mr-2 !rounded-lg before:!rounded-lg" onClick={() => redirectToTemplate(template.name)}>
                                {"View"}
                            </Button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
