"use client";
import { IDs } from "@/utils/helper";
import useContactForm from "@/hooks/useContactForm";
import Button from "@/components/Button";
import Input from "@/components/Input";

const Basic1Contact = () => {

    const { formData, handleSubmit, sending, setFormData, templateMode } = useContactForm({ templateName: "basic1template" });

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
