import { Header } from "@/components/home/Header";
import Home from "@/components/home/Home";
import Basic1 from "@/components/templates/basic/Basic1";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SquareX",
    description: "",
};

export default function Page() {
    return (
        <>
            <Header />
            <Home />
        </>
        // <Basic1 />
    );
};
