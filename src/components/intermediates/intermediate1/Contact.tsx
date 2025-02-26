"use client";
import { Input, TextArea } from "@/components/ui/Input";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import BottomGradient from "@/components/ui/BottomGradient";
import { sendMessage } from "@/apis/contact";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTemplateMode } from "@/store/templateSlice";
import { useParams } from "next/navigation";

export function ContactForm() {

    const params = useParams();
    const slug = params?.slug;

    const templateMode = useSelector(selectTemplateMode);

    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (templateMode !== "done" || !templateMode || !slug) return;

        setSending(true);
        const { data, error } = await sendMessage(slug as string, formData.name, formData.email, formData.message, "intermediate1template");

        if (data) {
            setFormData({
                name: "",
                email: "",
                message: "",
            })
        }

        setSending(false);
    }

    if (templateMode === "editing") return;

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input mt-10 mb-20">
            <h2 className="font-bold text-xl text-neutral-200">
                {"Contact Me"}
            </h2>
            <p className="text-sm max-w-sm mt-2 text-neutral-300">
                {"Feel free to reach out to me for any questions or opportunities!"}
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <div className="flex flex-row items-center justify-between w-full">
                            <label htmlFor="name" className="text-white">Your name</label>
                        </div>
                        <Input
                            id="name"
                            placeholder="John"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <div className="flex flex-row items-center justify-between w-full">
                        <label htmlFor="email" className="text-white">Email Address</label>
                    </div>
                    <Input
                        id="email"
                        placeholder="example@example.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <div className="flex flex-row items-center justify-between w-full">
                        <label htmlFor="userMessage" className="text-white">Message</label>
                    </div>
                    <TextArea
                        id="userMessage"
                        placeholder="Share your thoughts, questions, or feedback..."
                        className="h-36"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </LabelInputContainer>

                <button
                    className="my-8 bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    disabled={sending}
                >
                    {
                        sending ? "Sending..." : <>{"Send"} &rarr;</>
                    }
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>
        </div>
    );
};
