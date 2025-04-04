"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setMode } from "@/store/templateSlice";
import { templates } from "@/utils/helper";
import { ITemplates, TemplateType } from "@/utils/interfaces";
import Image from "next/image";
import Button from "../Button";
import { useTemplateContext } from "@/app/context/TemplateContext";
import { FullPageLoader } from "../Loader";

export default function Home() {

    const { fetchingUsedTemplates, usedTemplates } = useTemplateContext();

    if (fetchingUsedTemplates) return <FullPageLoader />;

    return (
        <div>
            <div className="w-full py-10 md:px-16 flex flex-col md:flex-row gap-8">
                {
                    templates.filter(template => !usedTemplates.includes(template.name?.toLowerCase() ?? '')).map(template => (
                        <TemplateCard key={template.name} template={template} />
                    ))
                }

                {
                    templates.filter(template => !usedTemplates.includes(template.name?.toLowerCase() ?? '')).length === 0 && (
                        <p className="text-xl mx-auto p-3 font-semibold text-center">
                            {"More templates coming soon!"}
                        </p>
                    )
                }
            </div>

            {
                templates.filter(template => usedTemplates.includes(template.name?.toLowerCase() ?? ''))?.length > 0 && (
                        <p className="text-3xl py-3 md:px-16 font-semibold text-center md:text-left">
                            {"Your templates"}
                        </p>
                )
            }

            <div className="w-full py-10 md:px-16 flex flex-col md:flex-row gap-8">
                {
                    templates.filter(template => usedTemplates.includes(template.name?.toLowerCase() ?? '')).map(template => (
                        <TemplateCard key={template.name} template={template} created={true} />
                    ))
                }
            </div>
        </div>
    );
};

const TemplateCard: React.FC<{
    template?: ITemplates;
    created?: boolean;
}> = ({ template, created }) => {


    const router = useRouter();
    const dispatch = useDispatch();

    // Function to redirect to the selected template
    const redirectToTemplate = (templateName: TemplateType) => {
        dispatch(setMode("editing"));
        router.push(`/template/${templateName}`);
    };

    if (!template) return;

    return (
        <div className="overflow-hidden w-[400px] max-w-[95vw] mx-auto md:mx-0 p-0.5 rounded-lg bg-gradient-to-b from-transparent to-[var(--primary)] duration-300 hover:scale-[1.02]">
            <div className="rounded-lg w-full h-full bg-black pb-2 overflow-hidden relative">
                <Image src={template.image} alt={template.name as string} width={450} height={350} className="w-full rounded-t-lg mx-auto h-auto md:h-[250px] object-cover object-center" />

                <p className="text-lg mt-8 mb-20 px-4">
                    {template.description}
                </p>

                <Button className="!absolute bottom-2 right-0 block ml-auto mr-2 !rounded-lg before:!rounded-lg" onClick={() => redirectToTemplate(template.name)}>
                    {created ? "Edit" : "Create"}
                </Button>
            </div>
        </div>
    );
};
