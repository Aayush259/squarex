import useFetchApi from "@/hooks/useFetchApi";
import { templateNames } from "@/utils/helper";

export const getCreatedTemplateNames = async () => {
    const { data, error } = await useFetchApi("/api/getCreatedTemplateNames", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return { data, error };
}

export const getPortfolioWithBasic1Template = async (slug: string) => {

    const payload = {
        templateName: templateNames.Basic1Template,
        slug: slug,
    }

    const { data, error } = await useFetchApi("/api/getPortfolio", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    return { data, error };
}
