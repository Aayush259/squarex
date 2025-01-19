import useFetchApi from "@/hooks/useFetchApi";
import { getImageFileBase64 } from "@/utils/funcs";
import { Basic1TemplateData } from "@/utils/interfaces";

const templateNames = {
    Basic1Template: "Basic1Template",
}

export const createPortfolioWithBasic1Template = async (templateData: Basic1TemplateData) => {
    let homeImage: string | null = null;
    const work: {
        title: string;
        url: string;
        description: string;
        image: File | string;
    }[] = [];

    const homeImageObjectUrl = templateData.home.image;

    if (homeImageObjectUrl && homeImageObjectUrl.startsWith("blob:")) {
        homeImage = await getImageFileBase64(homeImageObjectUrl);
    } else {
        homeImage = homeImageObjectUrl;
    }

    for (const project of templateData.work.projects) {
        const projectImage = project.image;
        let file: string | null = null;
        if (projectImage && projectImage.startsWith("blob:")) {
            file = await getImageFileBase64(projectImage);
        }
        work.push({
            title: project.title,
            url: project.url,
            description: project.description,
            image: file || projectImage,
        });
    };

    const payload = {
        templateName: templateNames.Basic1Template,
        templateData: {
            home: {
                title: templateData.home.title,
                name: templateData.home.name,
                role: templateData.home.role,
                bio: templateData.home.bio,
                image: homeImage,
            },
            work: {
                title: templateData.work.title,
                projects: work,
            },
            skills: templateData.skills,
            social: templateData.social,
        }
    }

    const { data, error } = await useFetchApi("/api/template", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    return { data, error };
}