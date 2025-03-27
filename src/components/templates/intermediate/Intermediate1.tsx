"use client";
import { useState } from "react";
import { IDs, intermediate1TemplateExampleData, templateNames } from "@/utils/helper";
import { Intermediate1TemplateData, TemplateDataType, TemplateType } from "@/utils/interfaces";
import { createPortfolioWithIntermediate1Template } from "@/apis/createPortfolio";
import { Intermediate1Contact } from "@/components/intermediates/intermediate1/Contact";
import Intermediate1Hero from "@/components/intermediates/intermediate1/Hero";
import Intermediate1About from "@/components/intermediates/intermediate1/About";
import Intermediate1Projects from "@/components/intermediates/intermediate1/Projects";
import Intermediate1Navigation from "@/components/intermediates/intermediate1/Navigation";
import BaseTemplate from "../BaseTemplate";

const Intermediate1 = () => {

    const [tracking, setTracking] = useState<{
        trackProjectClick: () => void;
        trackSocialClick: () => void;
    }>({
        trackProjectClick: () => { },
        trackSocialClick: () => { }
    });

    const createPortfolio = async (data: TemplateDataType) => {
        if (!data) return { created: false, error: "No data provided" };

        let created = false;
        const { data: portfolio, error } = await createPortfolioWithIntermediate1Template(data as Intermediate1TemplateData);

        if (portfolio) {
            console.log(portfolio);
            created = true;
        }
        return { created, error: error as string | null };
    };

    return (
        <BaseTemplate
            templateName={templateNames.Intermediate1Template as TemplateType}
            exampleTemplateData={intermediate1TemplateExampleData}
            createPortfolio={createPortfolio}
            setTrackingFunctions={setTracking}
        >
            <div id={IDs.B1} className="bg-black h-screen w-screen fixed top-0 left-0 heebo overflow-y-auto overflow-x-hidden pb-20">
                <Intermediate1Hero />
                <Intermediate1About />
                <Intermediate1Projects trackProjectClick={tracking.trackProjectClick} trackSocialClick={tracking.trackSocialClick} />
                <Intermediate1Contact />
                <Intermediate1Navigation trackProjectClick={tracking.trackProjectClick} trackSocialClick={tracking.trackSocialClick} />
            </div>
        </BaseTemplate>
    );
};

export default Intermediate1;
