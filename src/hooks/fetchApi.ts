
export default async function fetchApi(url: string, options?: RequestInit) {

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 404) {
                return { data: null, error: "NOT_FOUND" };
            } else {
                throw new Error('Network response was not ok');
            }
        }

        const result = await response.json();
        console.log(result);
        if (!result.success) {
            return { data: null, error: result.message as string };
        }
        return { data: result?.data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};
