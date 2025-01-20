"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { selectTemplateMode } from "@/store/templateSlice";
import { IDs } from "@/utils/helper";
import { useSelector } from "react-redux";

const Basic1Contact = () => {

    const templateMode = useSelector(selectTemplateMode);

    if (templateMode === "editing") return;

    return (
        <section id={IDs.CONTACT} className="my-10 w-[600px] max-w-[100vw] mx-auto py-5 px-2">
            <h2 className="text-xl md:text-2xl font-semibold">
                {"Connect with me"}
            </h2>
            <form className="py-4">
                <Input label="Name" className="!bg-white !border-transparent focus:!border-[var(--primary)]" />
                <Input label="Email" className="!bg-white !border-transparent focus:!border-[var(--primary)]" />

                <span>Message:</span>
                <textarea name="message" id="message" rows={5} className="w-full rounded-md bg-white !border-transparent border focus:!border-[var(--primary)] mt-1 p-2 outline-none" />

                <Button className="block w-full border border-[var(--primary)] my-4 !rounded-lg before:!rounded-lg">
                    {"Send"}
                </Button>
            </form>
        </section>
    );
};

export default Basic1Contact;
