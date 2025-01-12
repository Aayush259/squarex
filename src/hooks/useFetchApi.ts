
export default async function useFetchApi<Data>(url: string, options?: RequestInit) {

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (!result.success) {
            return { data: null, error: result.message };
        }
        return { data: result?.data, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};
