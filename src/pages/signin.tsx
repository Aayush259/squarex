"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../app/globals.css";
import Link from "next/link";
import Head from "next/head";

const SignIn = () => {

    const [signInState, setSignInState] = useState({
        formData: {
            email: "",
            password: "",
        },
        isLoading: false,
        error: "",
        success: false,
    });

    const setError = (error: string) => {
        setSignInState((prev) => ({ ...prev, error }));
    }

    const setSuccess = (success: boolean) => {
        setSignInState((prev) => ({ ...prev, success }));
    }

    const setLoading = (isLoading: boolean) => {
        setSignInState((prev) => ({ ...prev, isLoading }));
    }

    const setEmail = (email: string) => {
        setSignInState((prev) => ({ ...prev, formData: { ...prev.formData, email } }));
    }

    const setPassword = (password: string) => {
        setSignInState((prev) => ({ ...prev, formData: { ...prev.formData, password } }));
    }

    const router = useRouter();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email: signInState.formData.email,
            password: signInState.formData.password,
        });

        if (result?.error) {
            setError("Invalid email or password");
            setLoading(false);
            return;
        } else {
            setSuccess(true);
            router.push("/");
        }
    }

    return (
        <>
            <Head>
                <title>{"Sign In | SquareX"}</title>
            </Head>
            <div className="h-screen w-screen overflow-x-hidden overflow-y-auto flex items-center justify-center">
                <div className="mx-auto w-[500px] max-w-[90vw] rounded-lg px-4 py-8 relative overflow-hidden">
                    <div className="absolute w-full h-full top-0 left-0 bg-[var(--primary)] opacity-10"></div>
                    <div className="relative z-10">
                        <h1 className="text-2xl">
                            {"Sign In"}
                        </h1>

                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="squarex@example.com"
                                required
                                value={signInState.formData.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Password"
                                required
                                value={signInState.formData.password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button type="submit" className="!w-full my-5">
                                {"Sign In"}
                            </Button>

                            <p className="mt-4 text-center">
                                {"Not have an account? "}
                                <Link href="/signup" className="text-[var(--secondary)] hover:text-[var(--primary)]">{"Sign Up"}</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
