"use client";
import Basic1Header from "@/components/basics/basic1/Header";
import Basic1Hero from "@/components/basics/basic1/Hero";
import Basic1Projects from "@/components/basics/basic1/Projects";

const Basic1 = () => {

    return (
        <div className="bg-[#EDF7FA] text-[#21243D] h-screen w-screen fixed top-0 left-0 heebo overflow-y-auto">
            <Basic1Header />
            <Basic1Hero />
            <Basic1Projects />
        </div>
    )
};

export default Basic1;
