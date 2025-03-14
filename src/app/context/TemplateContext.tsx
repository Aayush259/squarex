"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/userSlice";
import { getCreatedTemplateNames } from "@/apis/getPortfolio";
import { IContact } from "@/utils/interfaces";
import { getMessages } from "@/apis/contact";

const TemplateContext = createContext<{
    fetchingUsedTemplates: boolean;
    fetchingContacts: boolean;
    usedTemplates: string[];
    contacts: IContact[];
    setUsedTemplates: React.Dispatch<React.SetStateAction<string[]>>;
    setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
}>({
    fetchingUsedTemplates: false,
    fetchingContacts: false,
    usedTemplates: [],
    contacts: [],
    setUsedTemplates: () => { },
    setContacts: () => { },
});

const TemplateContextProvider = ({ children }: { children: React.ReactNode }) => {

    const user = useSelector(selectUser);   // Stores user data

    const [fetchingUsedTemplates, setFetchingUsedTemplates] = useState<boolean>(false);   // State to track if fetching used templates
    const [fetchingContacts, setFetchingContacts] = useState<boolean>(false);   // State to track if fetching contacts
    const [initialized, setInitialized] = useState<boolean>(false); // Track initial fetch
    const [usedTemplates, setUsedTemplates] = useState<string[]>([]);   // State to track user's created templates
    const [contact, setContact] = useState<IContact[]>([]);     // State to track contact messages

    const fetchUsedTemplates = async () => {
        if (fetchingUsedTemplates || !user.id) return;
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

    // Function to get contact messages
    const getContactMessages = async () => {
        if (fetchingContacts || !user.id) return;
        setFetchingContacts(true);
        const { data } = await getMessages();

        if (data) {
            setContact(data);
        }
        setFetchingContacts(false);
    };

    useEffect(() => {
        fetchUsedTemplates();
        getContactMessages();
    }, [user]);

    return (
        <TemplateContext.Provider value={{
            fetchingUsedTemplates: !initialized || fetchingUsedTemplates,
            fetchingContacts: !initialized || fetchingContacts,
            usedTemplates,
            contacts: contact,
            setUsedTemplates,
            setContacts: setContact,
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
