"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { IDs } from "@/utils/helper";
import { sendMessage } from "@/apis/contact";
import { selectTemplateMode } from "@/store/templateSlice";
import Button from "@/components/Button";
import Input from "@/components/Input";

const Basic1Contact = () => {

    const params = useParams();
    const slug = params?.slug;   // Identifier for portfolio owner

    const templateMode = useSelector(selectTemplateMode);   // Stores current mode of template (e.g., editing, reviewing, etc.)

    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (templateMode !== "done" || !templateMode || !slug) return;

        setSending(true);
        const { data, error } = await sendMessage(slug as string, formData.name, formData.email, formData.message, "basic1template");
        console.log(data, error);

        if (data) {
            setFormData({
                name: "",
                email: "",
                message: "",
            })
        }

        setSending(false);
    };

    if (templateMode === "editing") return;

    return (
        <section id={IDs.CONTACT} className="my-10 w-[600px] max-w-[100vw] mx-auto py-5 px-2">
            <h2 className="text-xl md:text-2xl font-semibold">
                {"Connect with me"}
            </h2>
            <form className="py-4" onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    className="!bg-white !border-transparent focus:!border-[var(--primary)]"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Input
                    label="Email"
                    className="!bg-white !border-transparent focus:!border-[var(--primary)]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <span>Message:</span>
                <textarea
                    name="message"
                    id="message"
                    rows={5}
                    className="w-full rounded-md bg-white !border-transparent border focus:!border-[var(--primary)] mt-1 p-2 outline-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <Button className="block w-full border border-[var(--primary)] my-4 !rounded-lg before:!rounded-lg">
                    {sending ? "Sending..." : "Send"}
                </Button>
            </form>
        </section>
    );
};

export default Basic1Contact;
