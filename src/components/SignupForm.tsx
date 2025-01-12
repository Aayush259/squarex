"use client";
import { signup } from "@/apis/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {

    const [signInState, setSignInState] = useState({
        formData: {
            name: "",
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

    const setName = (name: string) => {
        setSignInState((prev) => ({ ...prev, formData: { ...prev.formData, name } }));
    }

    const router = useRouter();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const { data, error } = await signup({
            name: signInState.formData.name,
            email: signInState.formData.email,
            password: signInState.formData.password,
        });

        console.log(data, error);

        if (error) {
            console.log("error")
            setError(error as string);
        } else {
            console.log("Redirecting to signin page");
            setSuccess(true);
            router.push("/signin");
        }
        console.log("Done")
        setLoading(false);
    }

    return (
        <div className="h-screen w-screen overflow-x-hidden overflow-y-auto flex items-center justify-center">
            <div className="mx-auto w-[500px] max-w-[90vw] rounded-lg px-4 py-8 relative overflow-hidden">
                <div className="absolute w-full h-full top-0 left-0 bg-[var(--primary)] opacity-10"></div>
                <div className="relative z-10">
                    <h1 className="text-2xl">
                        {"Sign Up"}
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Name"
                            type="text"
                            placeholder="squarex@example.com"
                            required
                            value={signInState.formData.name}
                            onChange={(e) => setName(e.target.value)}
                        />

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

                        <Button disabled={signInState.isLoading || signInState.success} type="submit" className="!w-full my-5">
                            {"Sign Up"}
                        </Button>

                        <p className="mt-4 text-center">
                            {"Already have an account? "}
                            <Link href="/signin" className="text-[var(--secondary)] hover:text-[var(--primary)]">{"Sign In"}</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
