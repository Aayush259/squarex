import useFetchApi from "@/hooks/useFetchApi";
import { TemplateType } from "@/utils/interfaces";

export const sendMessage = async (slug: string, name: string, email: string, message: string, templateName: TemplateType) => {

    const payload = {
        user_id: slug,
        templateName: templateName,
        name,
        email,
        message,
    }

    const { data, error } = await useFetchApi("/api/sendMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    return { data, error };
};

export const getMessages = async () => {

    const { data, error } = await useFetchApi("/api/getMessages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return { data, error };
};
