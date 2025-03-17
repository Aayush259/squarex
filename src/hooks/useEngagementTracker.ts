import fetchApi from "./fetchApi";
import { useEffect, useState } from "react";
import { IEngagementData } from "@/utils/interfaces";

const useEngagementTracker = (slug: string | undefined) => {
    const [engagement, setEngagement] = useState<IEngagementData>({
        socialClicks: 0,
        projectClicks: 0,
        timeSpent: 0,
    });

    const startTime = performance.now();

    // Click handlers
    const trackSocialClick = () => {
        if (!slug) return;
        setEngagement((prev) => ({ ...prev, socialClicks: prev.socialClicks + 1 }));
    };

    const trackProjectClick = () => {
        if (!slug) return;
        setEngagement((prev) => ({ ...prev, projectClicks: prev.projectClicks + 1 }));
    };

    // Function to send engagement data before leaving
    const sendEngagementData = async () => {
        if (!slug) return;
        const totalTimeSpent = Math.round((performance.now() - startTime) / 1000);
        const finalData = { ...engagement, timeSpent: totalTimeSpent };

        await fetchApi("/api/updateEngagement", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, ...finalData }),
        });
    };

    useEffect(() => {
        // Send engagement data before unload
        window.addEventListener("beforeunload", sendEngagementData);

        return () => {
            sendEngagementData();
            window.removeEventListener("beforeunload", sendEngagementData);
        };
    }, [engagement]);

    return { trackSocialClick, trackProjectClick };
};

export default useEngagementTracker;
