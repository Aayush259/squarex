import { Header } from "@/components/home/Header";
import Home from "@/components/home/Home";
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
    );
};
