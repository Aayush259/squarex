import useFetchApi from "@/hooks/useFetchApi";
import { Basic1TemplateData } from "@/utils/interfaces";

const templateNames = {
    Basic1Template: "Basic1Template",
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
