"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setMode } from "@/store/templateSlice";
import { templates } from "@/utils/helper";
import { TemplateType } from "@/utils/interfaces";
import Image from "next/image";
import Button from "../Button";
import { useTemplateContext } from "@/app/context/TemplateContext";
import { FullPageLoader } from "../Loader";

export default function Home() {

    const router = useRouter();
    const dispatch = useDispatch();

    const { fetchingUsedTemplates, usedTemplates } = useTemplateContext();

    // Function to redirect to the selected template
    const redirectToTemplate = (templateName: TemplateType) => {
        dispatch(setMode("editing"));
        router.push(`/template/${templateName}`);
    };

    if (fetchingUsedTemplates) return <FullPageLoader />;

    return (
        <div className="w-full py-10 md:px-16 flex flex-col md:flex-row gap-8">
            {
                templates.filter(template => !usedTemplates.includes(template.name?.toLowerCase() ?? '')).map(template => (                    <div key={template.name} className="overflow-hidden w-[400px] max-w-[95vw] mx-auto md:mx-0 p-0.5 rounded-lg bg-gradient-to-b from-transparent to-[var(--primary)] duration-300 hover:scale-[1.02]">
                        <div className="rounded-lg w-full h-full bg-black pb-2 overflow-hidden relative">
                            <Image src={template.image} alt={template.name as string} width={450} height={350} className="w-full rounded-t-lg mx-auto h-auto md:h-[250px] object-cover object-center" />

                            <p className="text-lg mt-8 mb-20 px-4">
                                {template.description}
                            </p>

                            <Button className="!absolute bottom-2 right-0 block ml-auto mr-2 !rounded-lg before:!rounded-lg" onClick={() => redirectToTemplate(template.name)}>
                                {"View"}
                            </Button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
