import Dashboard from "@/components/home/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - SquareX",
    description: "",
};

export default function Page() {
    return <Dashboard />;
};
