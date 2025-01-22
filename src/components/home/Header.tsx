"use client";
import { useRouter } from "next/navigation";
import Button from "../Button";

export const Header = () => {

    const router = useRouter();

    return (
        <header className="sticky top-0 left-0 p-4 md:p-6">
            <Button className="!ml-auto !block" onClick={() => router.push("/dashboard")}>
                {"Dashboard"}
            </Button>
        </header>
    );
};
