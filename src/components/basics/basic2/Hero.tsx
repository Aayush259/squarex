"use client";
import { FaArrowRight } from "react-icons/fa6";
import Basic2Button from "./Button";

const Basic2Hero = () => {

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center px-5 py-12 md:px-36 outfit text-lg text-center">
            <p>
                {"👋 Hi! There, I'm "}
                <span>
                    {"Sathya,"}
                </span>
            </p>

            <p className="my-8 text-2xl md:text-9xl font-semibold aldrich">
                {"UI UX Designer & Web Designer"}
            </p>

            <p className="w-[450px] max-w-[90vw]">
                {"I Design Beautifully Simple Things And I Love What I Do. Just Simple Like That!"}
            </p>
            
            <Basic2Button className="text-sm !my-6">
                {"Let's Talk"}
                <FaArrowRight size={16} />
            </Basic2Button>
        </section>
    );
};

export default Basic2Hero;
