import Link from "next/link";

export const NotFound = () => {

    return (
        <div className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-black text-white z-[100]">
            <div className="w-[600px] max-w-[92vw]">
                <p className="text-2xl md:text-6xl text-center">
                    {"404 Not Found"}
                </p>
                <p className="mt-6 text-lg text-center">
                    {"If you are the owner of this portfolio and think it's a mistake, please raise an issue on our "}
                    <Link href={"https://github.com/Aayush259/squarex"} className="underline underline-offset-4 hover:no-underline duration-300">
                        {"GitHub repository"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export const SomethingWentWrong = () => {

    return (
        <div className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-black text-white z-[100]">
            <div className="w-[600px] max-w-[92vw]">
                <p className="text-2xl md:text-6xl text-center">
                    {"Something went wrong"}
                </p>
                <p className="mt-6 text-lg text-center">
                    {"If you think it's a mistake, please raise an issue on our "}
                    <Link href={"https://github.com/Aayush259/squarex"} className="underline underline-offset-4 hover:no-underline duration-300">
                        {"GitHub repository"}
                    </Link>
                </p>
            </div>
        </div>
    );
}
