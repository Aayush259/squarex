"use client";
import Image from "next/image";

const Basic1Hero = () => {

    const user = {
        name: "Aayush Kumar Kumawat",
        role: "Creative Technologist",
        imageUrl: "/MyImg.jpeg",
        bio: "I'm a creative technologist based in India. I love to create beautiful and functional websites. I'm currently working at a startup called MyStartup. I'm also a part-time freelancer and I love to work with startups that are building the future.",
    }

    return (
        <section className="w-full bg-[#FFFFFF] px-5 pt-12 pb-20 md:px-36 md:pt-28 md:pb-28">
            <div className="flex items-center justify-center gap-8 md:gap-20 flex-col-reverse md:flex-row">
                <div>
                    <h1 className="text-2xl md:text-6xl font-semibold flex flex-col gap-2 md:gap-4">
                        <span>{"Hi, I am " + user.name.split(" ")[0] + ","}</span>
                        <span>{user.role}</span>
                    </h1>

                    <p className="mt-4 md:mt-8">
                        {user.bio}
                    </p>
                </div>

                <Image src={user.imageUrl} alt={user.name} width={300} height={300} className="rounded-full w-[280px] h-[280px] md:h-[300px] md:w-[300px] object-cover object-top" />
            </div>

            <button className="mt-8 md:mt-0 bg-red-500 border-2 border-red-500 text-white rounded-sm py-1 px-8 font-semibold relative hover:text-red-500 duration-500 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0 before:rounded-sm before:bg-white before:duration-500 hover:before:w-full hover:before:left-0 disabled:opacity-50 disabled:cursor-default">
                <span className="relative z-10">{"My Work"}</span>
            </button>
        </section>
    );
};

export default Basic1Hero;
