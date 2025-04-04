"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/store/userSlice";
import { getPortfolioUrls, getRandomEmoji } from "@/utils/funcs";
import { templateNames } from "@/utils/helper";
import { updateMetadata } from "@/apis/createPortfolio";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { Loader } from "../Loader";
import Link from "next/link";
import Input from "../Input";
import Button from "../Button";
import { useTemplateContext } from "@/app/context/TemplateContext";
import { markAsVisited } from "@/apis/contact";
import EngagementVisuals from "./EngagementTrends";
import { addToast } from "@/store/toastSlice";

export default function Dashboard() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);   // Stores user data
    const { fetchingUsedTemplates, fetchingContacts, usedTemplates, contacts, engagementScore } = useTemplateContext();

    const [editMetadataWindowOpen, setEditMetadataWindowOpen] = useState<boolean>(false);   // State to track if edit metadata window is open

    // State to track metadata for portfolio
    const [metadata, setMetadata] = useState({
        templateName: "",
        page_title: "",
        page_description: "",
    });

    // State to track loading states for various operations
    const [fetching, setFetching] = useState({
        updatingMetadata: false,
        updatingMetadataError: false,
    });

    const randomEmoji = useMemo(() => getRandomEmoji(), []);    // Random emoji

    // Function to get default template names
    const getFrontEndTemplateName = (templateName: string) => {

        switch (templateName) {
            case templateNames.Basic1Template.toLowerCase():
                return "B1 - SquareX";
            case templateNames.Basic2Template.toLowerCase():
                return "B2 - SquareX";
            case templateNames.Intermediate1Template.toLowerCase():
                return "I1 - SquareX";
            default:
                return "";
        }
    };

    // Function to handle metadata update
    const handleEditMetadata = async () => {
        if (!metadata.templateName || fetching.updatingMetadata) return;
        setFetching({ ...fetching, updatingMetadata: true, updatingMetadataError: false });
        const { data } = await updateMetadata(metadata.templateName, metadata.page_title, metadata.page_description);

        if (data) {
            dispatch(addToast({ message: "Metadata updated!", success: true }));
            setEditMetadataWindowOpen(false);
        } else {
            dispatch(addToast({ message: "Failed to update metadata", success: false }));
            setFetching({ ...fetching, updatingMetadataError: true });
        }
        setFetching({ ...fetching, updatingMetadata: false });
    };

    const visitMessages = async () => {
        const notVisitedMessagesIds = contacts.filter(contact => !contact.visited).map(contact => contact._id);

        if (notVisitedMessagesIds.length > 0) {
            await markAsVisited(notVisitedMessagesIds);

            contacts.forEach(contact => {
                if (notVisitedMessagesIds.includes(contact._id)) {
                    contact.visited = true;
                }
            });
        }
    };

    // Effect to reset metadata on edit metadata window close
    useEffect(() => {
        if (!editMetadataWindowOpen) {
            setMetadata({
                templateName: "",
                page_title: "",
                page_description: "",
            });
        }
    }, [editMetadataWindowOpen]);

    useEffect(() => {
        visitMessages();
    }, [user, contacts]);

    if (!user) return;

    return (
        <section className="w-full">
            {
                editMetadataWindowOpen && <div className="fixed w-screen h-screen top-0 left-0 bg-black/85 flex items-center justify-center z-50">
                    <div className="w-[500px] max-w-[94vw] p-4 bg-[#884dd633] rounded-lg relative">
                        <button className="absolute top-4 right-4 hover:opacity-50" onClick={() => setEditMetadataWindowOpen(false)}>
                            <IoIosClose size={30} />
                        </button>

                        <Input label="Page Title" value={metadata.page_title} onChange={(e) => setMetadata({ ...metadata, page_title: e.target.value })} />

                        <Input label="Page Description" value={metadata.page_description} onChange={(e) => setMetadata({ ...metadata, page_description: e.target.value })} />

                        <Button className="!w-full !my-6" onClick={handleEditMetadata}>
                            {"Update"}
                        </Button>
                    </div>
                </div>
            }

            <p className="text-xl lg:text-2xl font-semibold p-4 lg:p-6">
                {"Hii "}{user?.name.split(" ")[0]}{" "}{randomEmoji}
            </p>

            <div className="flex flex-col-reverse lg:flex-row gap-4 items-start justify-between px-4 lg:px-6">
                <div className="mx-auto">
                    <h3 className="text-lg lg:text-2xl font-semibold my-4">{"Engagement Score"}</h3>
                    <div className="p-6 rounded-xl bg-[#884dd633] relative">

                        <div className="relative h-40 w-40 mx-auto">
                            {/* Outer circle (background) */}
                            <div className="absolute inset-0 rounded-full bg-[#884dd620]"></div>

                            {/* Progress circle */}
                            <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    className="text-[#884dd6] stroke-current"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    fill="transparent"
                                    r="42"
                                    cx="50"
                                    cy="50"
                                    style={{
                                        strokeDasharray: 264,
                                        strokeDashoffset: 264 - (264 * engagementScore) / 100
                                    }}
                                />
                            </svg>

                            {/* Score text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold">
                                    {Math.round(engagementScore)}{"%"}
                                </span>
                            </div>
                        </div>

                        <p className="text-center mt-4 text-sm opacity-75">
                            Based on views, clicks, and time spent
                        </p>
                    </div>
                </div>

                <div>
                    <p className="w-[500px] max-w-[90vw] text-lg md:text-2xl font-semibold my-4">
                        {"Your Portfolios"}
                    </p>

                    {
                        fetchingContacts && <div className="w-[500px] max-w-[90vw] flex items-center justify-center p-4">
                            <Loader />
                        </div>
                    }

                    {
                        !fetchingUsedTemplates && usedTemplates.length === 0 && <div className="w-[500px] max-w-[90vw] flex items-center justify-center p-4">
                            <Link href="/" className="hover:opacity-50">
                                {"Create your first portfolio!"}
                            </Link>
                        </div>
                    }

                    {
                        usedTemplates.reverse().map(template => {
                            const { portfolioUrl, templateUrl } = getPortfolioUrls(template, user.id);
                            const tName = getFrontEndTemplateName(template);

                            if (!portfolioUrl || !templateUrl) return;

                            return (
                                <div key={template} className="w-[500px] max-w-[90vw] my-2 p-4 rounded-lg bg-[#884dd633] hover:scale-[1.02] duration-300">
                                    <p className="text-lg mb-2">
                                        {tName}
                                    </p>
                                    <div className="w-full flex items-center justify-between">
                                        <Link href={portfolioUrl} target="_blank" className="underline hover:no-underline underline-offset-4 duration-300 flex items-center gap-2 text-lg w-fit">
                                            {"Visit"}
                                            <FaExternalLinkAlt size={18} />
                                        </Link>

                                        <div className="flex items-center gap-4">
                                            <button
                                                className="hover:opacity-50"
                                                onClick={() => {
                                                    setMetadata({
                                                        templateName: template,
                                                        page_title: "",
                                                        page_description: "",
                                                    });
                                                    setEditMetadataWindowOpen(true);
                                                }}
                                            >
                                                <FaGear size={24} />
                                            </button>

                                            <button onClick={() => window.open(templateUrl, "_blank")} className="hover:opacity-50">
                                                <GoPencil size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <EngagementVisuals />

            <p className="w-[90vw] mx-auto px-4 text-lg md:text-2xl font-semibold my-4">
                {"Messages:"}
            </p>

            <div className="w-full overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden">
                <div className="w-[90vw] mx-auto mb-20 min-w-[800px] h-fit col-span-4 py-4 bg-gradient-to-r dark:from-[#00000033] dark:to-[#00000033] from-[#FFFFFF33] to-[#FFFFFF66] rounded-3xl flex flex-col gap-4 dark:[box-shadow:inset_0_0_3px_0_#FFFFFF6B] [box-shadow:inset_0_0_3px_0_#FFFFFFBF]">

                    <div className="flex flex-col gap-1 relative px-4">
                        <div className="bg-gradient-to-r from-[#FFFFFF33] to-[#FFFFFF66] dark:from-[#1B1B1B47] dark:to-[#81818100] flex justify-between px-1 rounded-3xl relative dark:[box-shadow:inset_0_0_3px_0_#FFFFFF6B] [box-shadow:inset_0_0_3px_0_#FFFFFFBF]">
                            {["Name", "Email", "Message"].map((item) => {
                                return (
                                    <p key={item} className="py-2 text-sm font-medium dark:text-[#FFFFFFBF] text-[#1E1E1EBF] font-boston w-[33.33%] text-center">
                                        {item}
                                    </p>
                                );
                            })}
                        </div>

                        {
                            fetchingContacts && <div className="w-full flex items-center justify-center p-4">
                                <Loader />
                            </div>
                        }

                        {
                            !fetchingContacts && contacts.length === 0 && <div className="w-full flex items-center justify-center p-4">
                                {"No messages yet!"}
                            </div>
                        }

                        {
                            contacts.reverse().map((contactData, index) => {
                                return (
                                    <div key={index} className="bg-gradient-to-r from-[#FFFFFF33] to-[#FFFFFF66] dark:from-[#1B1B1B47] dark:to-[#81818100] flex justify-between px-2 rounded-3xl relative break-words dark:[box-shadow:inset_0_0_3px_0_#FFFFFF6B] [box-shadow:inset_0_0_3px_0_#FFFFFFBF]">

                                        <p className="py-3 text-sm font-medium dark:text-[#FFFFFFBF] text-[#1E1E1EBF] w-[33.33%] text-center">
                                            {contactData.data.name}
                                        </p>
                                        <p className="py-3 text-sm font-medium dark:text-[#FFFFFFBF] text-[#1E1E1EBF] w-[33.33%] text-center">
                                            {contactData.data.email}
                                        </p>
                                        <p className="py-3 text-sm font-medium dark:text-[#FFFFFFBF] text-[#1E1E1EBF] w-[33.33%] text-center px-3">
                                            {contactData.data.message}
                                        </p>
                                    </div>
                                );
                            })
                        }
                        <div className="w-[1px] h-full bg-[#FFFFFF40] absolute left-[33.33%]" />
                        <div className="w-[1px] h-full bg-[#FFFFFF40] absolute left-[66.66%]" />
                    </div>
                </div>
            </div>
        </section>
    );
};
