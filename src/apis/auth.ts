import fetchApi from "@/hooks/fetchApi";

export const signup = async (formData: {
    name: string;
    email: string;
    password: string;
}) => {
    const { data, error } = await fetchApi("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    return { data, error };
};
