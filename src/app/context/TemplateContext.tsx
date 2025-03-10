"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/userSlice";
import { getCreatedTemplateNames } from "@/apis/getPortfolio";

const TemplateContext = createContext<{
    fetchingUsedTemplates: boolean;
    usedTemplates: string[];
    setUsedTemplates: React.Dispatch<React.SetStateAction<string[]>>;
}>({
    fetchingUsedTemplates: false,
    usedTemplates: [],
    setUsedTemplates: () => { },
});

const TemplateContextProvider = ({ children }: { children: React.ReactNode }) => {

    const user = useSelector(selectUser);   // Stores user data

    const [fetchingUsedTemplates, setFetchingUsedTemplates] = useState<boolean>(false);   // State to track if fetching used templates
    const [initialized, setInitialized] = useState<boolean>(false); // Track initial fetch
    const [usedTemplates, setUsedTemplates] = useState<string[]>([]);   // State to track user's created templates

    const fetchUsedTemplates = async () => {
        if (fetchingUsedTemplates) return;
        setFetchingUsedTemplates(true);
        const { data } = await getCreatedTemplateNames();
        console.log(data);

        if (data) {
            const templates = data.map((template: string) => template.toLowerCase());
            setUsedTemplates(templates);
        }
        setFetchingUsedTemplates(false);
        setInitialized(true);
    };

    useEffect(() => {
        fetchUsedTemplates();
    }, [user]);

    return (
        <TemplateContext.Provider value={{
            fetchingUsedTemplates: !initialized || fetchingUsedTemplates,
            usedTemplates,
            setUsedTemplates,
        }}>
            {children}
        </TemplateContext.Provider>
    );
};

const useTemplateContext = () => {
    const context = useContext(TemplateContext);
    if (!context) {
        throw new Error("useTemplateContext must be used within a TemplateContextProvider");
    }
    return context;
};

export { TemplateContextProvider, useTemplateContext };
