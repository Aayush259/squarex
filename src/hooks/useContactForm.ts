import { useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/apis/contact";
import { TemplateType } from "@/utils/interfaces";
import { selectTemplateMode } from "@/store/templateSlice";
import { addToast } from "@/store/toastSlice";

export default function useContactForm({ templateName }: { templateName: TemplateType }) {

    const params = useParams();
    const dispatch = useDispatch();
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
        if (templateMode !== "done" || !templateMode || !slug || sending) return;

        setSending(true);
        const { data, error } = await sendMessage(slug as string, formData.name, formData.email, formData.message, templateName);
        console.log(data, error);

        if (data) {
            dispatch(addToast({ message: "Message sent!", success: true }));
            setFormData({ name: "", email: "", message: "" });
        }

        setSending(false);
    };

    return {
        sending,
        formData,
        setFormData,
        handleSubmit,
        templateMode,
    };
};
