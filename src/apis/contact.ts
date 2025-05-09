import fetchApi from "@/hooks/fetchApi";
import { TemplateType } from "@/utils/interfaces";

// Function to send a message
export const sendMessage = async (slug: string, name: string, email: string, message: string, templateName: TemplateType) => {

    const payload = {
        user_id: slug,
        templateName: templateName,
        name,
        email,
        message,
    }

    const { data, error } = await fetchApi("/api/sendMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    return { data, error };
};

// Function to get messages
export const getMessages = async () => {

    const { data, error } = await fetchApi("/api/getMessages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return { data, error };
};

// Function to mark messages as visited
export const markAsVisited = async (messageIds: string[]) => {

    const { data, error } = await fetchApi("/api/markAsVisited", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageIds }),
    });

    return { data, error };
};
