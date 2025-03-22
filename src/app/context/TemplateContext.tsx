"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/userSlice";
import { getCreatedTemplateNames } from "@/apis/getPortfolio";
import { IContact, IEngagementApiData, IEngagementMetric } from "@/utils/interfaces";
import { getMessages } from "@/apis/contact";
import { getEngagement } from "@/apis/engagement";

const TemplateContext = createContext<{
    fetchingUsedTemplates: boolean;
    fetchingContacts: boolean;
    fetchingEngagement: boolean;
    usedTemplates: string[];
    contacts: IContact[];
    engagementData: IEngagementApiData | null;
    viewsArr: IEngagementMetric[];
    socialClicksArr: IEngagementMetric[];
    projectClicksArr: IEngagementMetric[];
    timeSpentArr: IEngagementMetric[];
    engagementScore: number;
}>({
    fetchingUsedTemplates: false,
    fetchingContacts: false,
    fetchingEngagement: false,
    usedTemplates: [],
    contacts: [],
    engagementData: null,
    viewsArr: [],
    socialClicksArr: [],
    projectClicksArr: [],
    timeSpentArr: [],
    engagementScore: 0,
});

const TemplateContextProvider = ({ children }: { children: React.ReactNode }) => {

    const user = useSelector(selectUser);   // Stores user data

    const [fetchingUsedTemplates, setFetchingUsedTemplates] = useState<boolean>(false);   // State to track if fetching used templates
    const [fetchingContacts, setFetchingContacts] = useState<boolean>(false);   // State to track if fetching contacts
    const [fetchingEngagement, setFetchingEngagement] = useState<boolean>(false);   // State to track if fetching contacts
    const [initialized, setInitialized] = useState<boolean>(false); // Track initial fetch
    const [usedTemplates, setUsedTemplates] = useState<string[]>([]);   // State to track user's created templates
    const [contact, setContact] = useState<IContact[]>([]);     // State to track contact messages
    const [engagementData, setEngagementData] = useState<IEngagementApiData | null>(null);   // State to track engagement data

    // Memoized values for engagement data
    const viewsArr = useMemo(() => {
        if (!engagementData) return [];
        return engagementData.views.flatMap(view => view.views);
    }, [engagementData]);

    const socialClicksArr = useMemo(() => {
        if (!engagementData) return [];
        return engagementData.engagement.socialClicks;
    }, [engagementData]);

    const projectClicksArr = useMemo(() => {
        if (!engagementData) return [];
        return engagementData.engagement.projectClicks;
    }, [engagementData]);

    const timeSpentArr = useMemo(() => {
        if (!engagementData) return [];
        return engagementData.engagement.timeSpent.map(time => ({ ...time, count: time.count / 60 }));
    }, [engagementData]);

    // Engagement score
    const engagementScore = useMemo(() => {
        const totalViews = viewsArr.reduce((acc, view) => acc + view.count, 0);
        const totalClicks = [...socialClicksArr, ...projectClicksArr].reduce((acc, click) => acc + click.count, 0);
        const totalTimeSpent = timeSpentArr.reduce((acc, time) => acc + time.count, 0);
        const score = ((totalClicks + totalTimeSpent) / totalViews) * 100;

        if (isNaN(score)) return 0;
        return score;
    }, [viewsArr, socialClicksArr, projectClicksArr, timeSpentArr]);

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

    // Function to fetch engagement data
    const fetchEngagements = async () => {
        if (fetchingEngagement || !user.id) return;
        setFetchingEngagement(true);
        const { data } = await getEngagement();

        if (data) {
            setEngagementData(data);
        }
        setFetchingEngagement(false);
    };

    useEffect(() => {
        fetchUsedTemplates();
        getContactMessages();
        fetchEngagements();
    }, [user]);

    return (
        <TemplateContext.Provider value={{
            fetchingUsedTemplates: !initialized || fetchingUsedTemplates,
            fetchingContacts: !initialized || fetchingContacts,
            fetchingEngagement: !initialized || fetchingEngagement,
            usedTemplates,
            contacts: contact,
            engagementData,
            viewsArr,
            socialClicksArr,
            projectClicksArr,
            timeSpentArr,
            engagementScore,
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
