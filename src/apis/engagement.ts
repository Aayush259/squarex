import fetchApi from "@/hooks/fetchApi";

export const getEngagement = async () => {

    const { data, error } = await fetchApi("/api/getEngagement", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return { data, error };
};
