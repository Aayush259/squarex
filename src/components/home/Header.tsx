"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTemplateContext } from "@/app/context/TemplateContext";
import { IoIosNotificationsOutline } from "react-icons/io";
import Button from "../Button";

export const Header = () => {

    const router = useRouter();
    const { contacts } = useTemplateContext();

    const [notificationPopupOpen, setNotificationPopupOpen] = useState<boolean>(false);

    useEffect(() => {
        const closeNotificationPopup = () => {
            setNotificationPopupOpen(false);
        };

        window.addEventListener("click", closeNotificationPopup);
    }, []);

    return (
        <header className="sticky top-0 left-0 p-4 md:p-6">
            <div className="flex items-center justify-end gap-4 relative">
                <button
                    className="relative"
                    onClick={(e) => {
                        e.stopPropagation();
                        setNotificationPopupOpen(prev => !prev);
                    }}
                >
                    <IoIosNotificationsOutline size={30} className="hover:text-[var(--primary)] duration-200" />

                    {
                        contacts.filter(contact => !contact.visited).length > 0 && <span className="block absolute top-0 right-0 h-2 w-2 rounded-full bg-[var(--primary)] before:absolute before:top-0 before:left-0 before:h-full before:w-full before:rounded-full before:bg-[var(--primary)] before:animate-ping" />
                    }
                </button>

                <div
                    className={`absolute top-[120%] right-0 w-[300px] max-w-[90vw] rounded-md [box-shadow:inset_0_0_3px_0_#FFFFFF6B] overflow-hidden 57.6 duration-300 ${notificationPopupOpen ? "opacity-100" : "opacity-0"}`}
                    style={{
                        height: notificationPopupOpen ? (contacts.filter(contact => !contact.visited).length || 1) * 57.6 : 0
                    }}

                    onClick={(e) => e.stopPropagation()}
                >
                    {
                        contacts.filter(contact => !contact.visited).map((contact, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 border-y border-neutral-400/15 select-none cursor-pointer hover:opacity-70" onClick={() => router.push(`/dashboard`)}>
                                <div className="h-2 w-2 bg-[var(--primary)] rounded-full" />
                                <p className="w-[97%] whitespace-nowrap overflow-ellipsis overflow-hidden">
                                    <span className="font-semibold">{contact.data.name + ": "}</span>
                                    <span>{contact.data.message}</span>
                                </p>
                            </div>
                        ))
                    }

                    {
                        contacts.filter(contact => !contact.visited).length === 0 && <div className="flex items-center justify-center p-4">
                            {"All caught up!"}
                        </div>
                    }
                </div>

                <Button className="!block" onClick={() => router.push("/dashboard")}>
                    {"Dashboard"}
                </Button>
            </div>
        </header>
    );
};
