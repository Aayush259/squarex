import useFetchApi from "@/hooks/useFetchApi";
import { Basic1TemplateData } from "@/utils/interfaces";

const templateNames = {
    Basic1Template: "Basic1Template",
}

export const createPortfolioWithBasic1Template = async (templateData: Basic1TemplateData) => {
    let homeImage: File | string | null = null;
    const work: {
        title: string;
        url: string;
        description: string;
        image: File | string;
    }[] = [];

    const homeImageObjectUrl = templateData.home.image;

    if (homeImageObjectUrl && homeImageObjectUrl.startsWith("blob:")) {
        const blob = await fetch(homeImageObjectUrl).then(res => res.blob());
        if (blob) {
            homeImage = new File([blob], "homeImage.png", { type: "image/png" });
        }
    } else {
        homeImage = homeImageObjectUrl;
    }

    for (const project of templateData.work.projects) {
        const projectImage = project.image;
        let file: File | null = null;
        if (projectImage && projectImage.startsWith("blob:")) {
            const blob = await fetch(projectImage).then(res => res.blob());
            if (blob) {
                file = new File([blob], "projectImage.png", { type: "image/png" });
            }
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

    const {data, error} = await useFetchApi("/api/template", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
}