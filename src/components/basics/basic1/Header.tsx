"use client";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

export default function Basic1Header() {

    const nav = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "My  Work",
            link: "/",
        },
        {
            name: "Contact",
            link: "/",
        },
    ];

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    return (
        <>
            <header className="flex sticky top-0 left-0 z-50 bg-[#FFFFFF] py-5 px-10 md:items-center md:justify-end gap-4 md:gap-10 text-lg">
                <button className="md:hidden w-fit ml-auto outline-none" onClick={() => setIsSidebarOpen(true)}>
                    <RxHamburgerMenu size={24} />
                </button>

                {
                    nav.map((item, index) => (
                        <Link href={item.link} key={index} className="hidden md:block font-semibold hover:text-red-500 duration-300">
                            {item.name}
                        </Link>
                    ))
                }
            </header>

            <div className={`fixed z-[60] py-5 px-10 top-0 w-screen h-screen bg-white ${isSidebarOpen ? "left-0" : "left-full"} duration-300`}>
                <button className="ml-auto mb-10 outline-none w-fit block" onClick={() => setIsSidebarOpen(false)}>
                    <IoCloseOutline size={24} />
                </button>

                {
                    nav.map((item, index) => (
                        <Link href={item.link} key={index} className="block w-full my-6 text-lg text-center font-semibold duration-300">
                            {item.name}
                        </Link>
                    ))
                }
            </div>
        </>
    );
};
