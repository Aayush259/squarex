"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/userSlice";
import { getRandomEmoji } from "@/utils/funcs";
import { templateNames } from "@/utils/helper";
import { IContact } from "@/utils/interfaces";
import { getCreatedTemplateNames } from "@/apis/getPortfolio";
import { updateMetadata } from "@/apis/createPortfolio";
import { getMessages } from "@/apis/contact";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { Loader } from "../Loader";
import Link from "next/link";
import Input from "../Input";
import Button from "../Button";

export default function Dashboard() {

    const user = useSelector(selectUser);   // Stores user data

    const [userTemplates, setUserTemplates] = useState<string[]>([]);   // State to track user's created templates
    const [editMetadataWindowOpen, setEditMetadataWindowOpen] = useState<boolean>(false);   // State to track if edit metadata window is open
    const [contact, setContact] = useState<IContact[]>([]);     // State to track contact messages

    // State to track metadata for portfolio
    const [metadata, setMetadata] = useState({
        templateName: "",
        page_title: "",
        page_description: "",
    });

    // State to track loading states for various operations
    const [fetching, setFetching] = useState({
        fetchingContacts: false,
        fetchingPortfolios: false,
        updatingMetadata: false,
        contactsError: false,
        portfoliosError: false,
        updatingMetadataError: false,
    });

    const randomEmoji = useMemo(() => getRandomEmoji(), []);    // Random emoji

    // Function to fetch user's created portfolios
    const getPortfolioUrls = (templateName: string) => {
        let portfolioUrl = "";
        let templateUrl = "";

        switch (templateName) {
            case templateNames.Basic1Template:
                portfolioUrl = `/portfolio/${user?.id}/b1`;
                templateUrl = `/template/basic1template`;
                break;
            case templateNames.Basic2Template:
                portfolioUrl = `/portfolio/${user?.id}/b2`;
                templateUrl = `/template/basic2template`;
                break;
            case templateNames.Intermediate1Template:
                portfolioUrl = `/portfolio/${user?.id}/i1`;
                templateUrl = `/template/intermediate1template`;
                break;
        }

        return { portfolioUrl, templateUrl };
    };

    // Function to get default template names
    const getFrontEndTemplateName = (templateName: string) => {

        switch (templateName) {
            case templateNames.Basic1Template:
                return "B1 - SquareX";
            case templateNames.Basic2Template:
                return "B2 - SquareX";
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
            setEditMetadataWindowOpen(false);
        } else {
            setFetching({ ...fetching, updatingMetadataError: true });
        }
        setFetching({ ...fetching, updatingMetadata: false });
    };

    // Function to get templates
    const getTemplateNames = async () => {
        if (fetching.fetchingPortfolios) return;
        setFetching({ ...fetching, fetchingPortfolios: true, portfoliosError: false });
        const { data } = await getCreatedTemplateNames();
        console.log(data);

        if (data) {
            setUserTemplates(data);
        } else {
            setFetching({ ...fetching, portfoliosError: true });
        }
        setFetching({ ...fetching, fetchingPortfolios: false });
    };

    // Function to get contact messages
    const getContactMessages = async () => {
        if (fetching.fetchingContacts) return;
        setFetching({ ...fetching, fetchingContacts: true, contactsError: false });
        const { data } = await getMessages();

        if (data) {
            setContact(data);
        } else {
            setFetching({ ...fetching, contactsError: true });
        }
        setFetching({ ...fetching, fetchingContacts: false });
    };

    // Effect to fetch data on component mount
    useEffect(() => {
        if (!user?.id) return;
        getTemplateNames();
        getContactMessages();
    }, [user]);

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

    if (!user) return;

    return (
        <section className="w-full">
            {
                editMetadataWindowOpen && <div className="fixed w-screen h-screen top-0 left-0 bg-black/85 flex items-center justify-center">
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

            <div className="flex items-start justify-between p-4 lg:p-6">
                <div>
                    <p className="text-xl lg:text-2xl font-semibold">
                        {"Hii "}{user?.name.split(" ")[0]}{" "}{randomEmoji}
                    </p>
                </div>

                <div>
                    <p className="w-[500px] max-w-[90vw] text-lg md:text-xl font-semibold my-4">
                        {"Your Portfolios"}
                    </p>

                    {
                        fetching.fetchingContacts && <div className="w-[500px] max-w-[90vw] flex items-center justify-center p-4">
                            <Loader />
                        </div>
                    }

                    {
                        fetching.contactsError && <div className="w-[500px] max-w-[90vw] flex items-center justify-center p-4">
                            {"Something went wrong! "}
                            <button className="underline hover:no-underline underline-offset-4" onClick={getTemplateNames}>{"Retry"}</button>
                        </div>
                    }

                    {
                        !fetching.fetchingPortfolios && !fetching.portfoliosError && userTemplates.length === 0 && <div className="w-[500px] max-w-[90vw] flex items-center justify-center p-4">
                            <Link href="/" className="hover:opacity-50">
                                {"Create your first portfolio!"}
                            </Link>
                        </div>
                    }

                    {
                        userTemplates.reverse().map(template => {
                            const { portfolioUrl, templateUrl } = getPortfolioUrls(template);
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

            <p className="w-[90vw] mx-auto mt-20 px-4 text-lg md:text-xl font-semibold my-4">
                {"Messages:"}
            </p>

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
                        fetching.fetchingContacts && <div className="w-full flex items-center justify-center p-4">
                            <Loader />
                        </div>
                    }

                    {
                        fetching.contactsError && <div className="w-full flex items-center justify-center p-4">
                            {"Something went wrong! "}
                            <button className="underline hover:no-underline underline-offset-4" onClick={getContactMessages}>{"Retry"}</button>
                        </div>
                    }

                    {
                        !fetching.fetchingContacts && !fetching.contactsError && contact.length === 0 && <div className="w-full flex items-center justify-center p-4">
                            {"No messages yet!"}
                        </div>
                    }

                    {
                        contact.reverse().map((contactData, index) => {
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
        </section>
    );
};
