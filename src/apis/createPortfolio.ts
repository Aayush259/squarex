import useFetchApi from "@/hooks/useFetchApi";
import { getImageFileBase64 } from "@/utils/funcs";
import { templateNames } from "@/utils/helper";
import { Basic1TemplateData, Basic2TemplateData, Intermediate1TemplateData } from "@/utils/interfaces";

export const updateMetadata = async (templateName: string, page_title?: string, page_description?: string) => {

    const payload = {
        templateName,
        ...(page_title ? { page_title } : {}),
        ...(page_description ? { page_description } : {}),
    };

    const { data, error } = await useFetchApi("/api/editMetadata", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    return { data, error };
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

export const createPortfolioWithBasic2Template = async (templateData: Basic2TemplateData) => {

    const work: {
        title: string;
        url: string;
        description: string;
        image: File | string;
    }[] = [];

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
        templateName: templateNames.Basic2Template,
        templateData: {
            home: templateData.home,
            about: templateData.about,
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

export const createPortfolioWithIntermediate1Template = async (templateData: Intermediate1TemplateData) => {

    const work: {
        name: string;
        description: string;
        image: File | string;
        url: string;
        gitHubLink: string;
    }[] = [];

    for (const project of templateData.projects) {
        const projectImage = project.image;
        let file: string | null = null;
        if (projectImage && projectImage.startsWith("blob:")) {
            file = await getImageFileBase64(projectImage);
        }

        work.push({
            name: project.name,
            description: project.description,
            image: file || projectImage,
            url: project.url,
            gitHubLink: project.gitHubLink,
        });
    };

    const payload = {
        templateName: templateNames.Intermediate1Template,
        templateData: {
            home: templateData.home,
            about: templateData.about,
            projects: work,
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
