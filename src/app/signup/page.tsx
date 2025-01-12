import SignUpForm from "@/components/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up | SquareX",
};

export default function Page() {
    return <SignUpForm />
}
