"use client";

export default function Basic2Header() {

    return (
        <header className="flex sticky top-0 left-0 z-50 bg-[#FFFFFF] py-5 px-10 md:items-center md:justify-center gap-4 [box-shadow:0_4px_14.8px_0_#0000001c] overlock">

            <div className="w-fit flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-10 font-thin">
                <span
                    className={`outline-none hidden md:block hover:text-neutral-400/40 duration-300`}
                >
                    {"Home"}
                </span>
                <span
                    className={`outline-none hidden md:block hover:text-neutral-400/40 duration-300`}
                >
                    {"About Me"}
                </span>
                <span
                    className={`outline-none hidden md:block hover:text-neutral-400/40 duration-300`}
                >
                    {"Selected Works"}
                </span>
                <span
                    className={`outline-none hidden md:block hover:text-neutral-400/40 duration-300`}
                >
                    {"What I do"}
                </span>
                <span
                    className={`outline-none hidden md:block hover:text-neutral-400/40 duration-300`}
                >
                    {"Contact"}
                </span>
            </div>

        </header>
    );
};
