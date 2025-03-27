"use client";
import { useState } from "react";
import { basic2TemplateExampleData, IDs, templateNames } from "@/utils/helper";
import { Basic2TemplateData, TemplateDataType, TemplateType } from "@/utils/interfaces";
import { createPortfolioWithBasic2Template } from "@/apis/createPortfolio";
import Basic2Header from "@/components/basics/basic2/Header";
import Basic2Hero from "@/components/basics/basic2/Hero";
import Basic2About from "@/components/basics/basic2/About";
import Basic2Projects from "@/components/basics/basic2/Projects";
import Basic2WhatiDo from "@/components/basics/basic2/WhatIDo";
import Basic2Contact from "@/components/basics/basic2/Contact";
import Basic2Footer from "@/components/basics/basic2/Footer";
import BaseTemplate from "../BaseTemplate";

const Basic2 = () => {

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
        const { data: portfolio, error } = await createPortfolioWithBasic2Template(data as Basic2TemplateData);

        if (portfolio) {
            console.log(portfolio);
            created = true;
        }
        return { created, error: error as string | null };
    };

    return (
        <BaseTemplate
            templateName={templateNames.Basic2Template as TemplateType}
            exampleTemplateData={basic2TemplateExampleData}
            createPortfolio={createPortfolio}
            setTrackingFunctions={setTracking}
        >
            <div id={IDs.B1} className="bg-[#FFFFFF] text-[#303030] h-screen w-screen fixed top-0 left-0 heebo overflow-y-auto overflow-x-hidden">
                <Basic2Header />
                <Basic2Hero />
                <Basic2About />
                <Basic2Projects trackProjectClick={tracking.trackProjectClick} trackSocialClick={tracking.trackSocialClick} />
                <Basic2WhatiDo />
                <Basic2Contact />
                <Basic2Footer trackProjectClick={tracking.trackProjectClick} trackSocialClick={tracking.trackSocialClick} />
            </div>
        </BaseTemplate>
    );
};

export default Basic2;
