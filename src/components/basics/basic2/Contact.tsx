"use client";
import { IDs } from "@/utils/helper";
import Basic2Button from "./Button";
import Input from "@/components/Input";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectTemplateMode } from "@/store/templateSlice";
import { useState } from "react";
import { sendMessage } from "@/apis/contact";

const Basic2Contact = () => {

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
        const { data, error } = await sendMessage(slug as string, formData.name, formData.email, formData.message, "basic1template");

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
        <section id={IDs.CONTACT} className="w-full px-5 py-5 md:px-36 outfit">
            <p className="text-2xl font-semibold w-full text-center">
                {"Contact"}
            </p>

            <p className="text-4xl md:text-6xl font-semibold text-center my-4">
                {"Let's rock "}
                <span className="text-neutral-400">
                    {"with me"}
                </span>
            </p>

            <form className="py-4 w-[500px] max-w-full mx-auto" onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    className="!bg-white !border-neutral-300 focus:!border-[#303030]"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <Input
                    label="Email"
                    className="!bg-white !border-neutral-300 focus:!border-[#303030]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <span>Message:</span>
                <textarea
                    name="message"
                    id="message"
                    rows={5}
                    className="w-full rounded-md border-neutral-300 bg-white border focus:border-[#303030] mt-1 p-2 outline-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <Basic2Button className="block !my-8 !ml-auto">
                    {sending ? "Sending..." : "Send"}
                </Basic2Button>
            </form>
        </section>
    );
};

export default Basic2Contact;
