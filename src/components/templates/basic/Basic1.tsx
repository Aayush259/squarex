"use client";
import { useState } from "react";
import { basic1TemplateExampleData, IDs, templateNames } from "@/utils/helper";
import { Basic1TemplateData, TemplateDataType, TemplateType } from "@/utils/interfaces";
import { createPortfolioWithBasic1Template } from "@/apis/createPortfolio";
import Basic1Header from "@/components/basics/basic1/Header";
import Basic1Hero from "@/components/basics/basic1/Hero";
import Basic1Projects from "@/components/basics/basic1/Projects";
import Basic1Skills from "@/components/basics/basic1/Skills";
import Basic1Contact from "@/components/basics/basic1/Contact";
import Basic1Footer from "@/components/basics/basic1/Footer";
import BaseTemplate from "../BaseTemplate";

const Basic1 = () => {

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
        const { data: portfolio, error } = await createPortfolioWithBasic1Template(data as Basic1TemplateData);

        if (portfolio) {
            console.log(portfolio);
            created = true;
        }
        return { created, error: error as string | null };
    };

    return (
        <BaseTemplate
            templateName={templateNames.Basic1Template as TemplateType}
            exampleTemplateData={basic1TemplateExampleData}
            createPortfolio={createPortfolio}
            setTrackingFunctions={setTracking}
        >
            <div id={IDs.B1} className="bg-[#EDF7FA] text-[#21243D] h-screen w-screen fixed top-0 left-0 heebo overflow-y-auto overflow-x-hidden">
                <Basic1Header />
                <Basic1Hero />
                <Basic1Projects trackProjectClick={tracking.trackProjectClick} trackSocialClick={tracking.trackSocialClick} />
                <Basic1Skills />
                <Basic1Contact />
                <Basic1Footer trackProjectClick={tracking.trackProjectClick} trackSocialClick={tracking.trackSocialClick} />
            </div>
        </BaseTemplate>
    );
};

export default Basic1;
