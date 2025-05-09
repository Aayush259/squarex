"use client";
import { IDs } from "@/utils/helper";
import useContactForm from "@/hooks/useContactForm";
import { Input, TextArea } from "@/components/ui/Input";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import BottomGradient from "@/components/ui/BottomGradient";

export function Intermediate1Contact() {

    const { formData, handleSubmit, sending, setFormData, templateMode } = useContactForm({ templateName: "intermediate1template" });

    if (templateMode === "editing") return;

    return (
        <section id={IDs.CONTACT} className="bg-black pb-20">
            <div className="max-w-[600px] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
                <h2 className="text-center font-bold text-2xl text-neutral-200">
                    {"Contact Me"}
                </h2>
                <p className="text-center mt-2 text-neutral-300">
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
                            sending ? "Sending..." : <>{"Send"} →</>
                        }
                        <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                </form>
            </div>
        </section>
    );
};
