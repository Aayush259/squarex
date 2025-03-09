import fetchApi from "@/hooks/fetchApi";

// Function to get created template names
export const getCreatedTemplateNames = async () => {
    const { data, error } = await fetchApi("/api/getCreatedTemplateNames", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return { data, error };
}

// Function to get portfolio data
export const getPortfolioData = async (slug: string, templateName: string) => {

    const payload = {
        templateName: templateName,
        slug: slug,
    }

    const { data, error } = await fetchApi("/api/getPortfolio", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    return { data, error };
}
