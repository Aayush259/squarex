import useFetchApi from "@/hooks/useFetchApi";

export const getCreatedTemplateNames = async () => {
    const { data, error } = await useFetchApi("/api/getCreatedTemplateNames", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return { data, error };
}

export const getPortfolioData = async (slug: string, templateName: string) => {

    const payload = {
        templateName: templateName,
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
