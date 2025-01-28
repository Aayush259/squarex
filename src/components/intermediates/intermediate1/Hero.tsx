import WavyBackground from "@/components/ui/WavyBackground";

export function Hero() {

    const myHeadlines = [
        {
            id: 1,
            line: 'A Full-stack Developer 🖥️'
        },
        {
            id: 2,
            line: 'A Tech enthusiast 🚀'
        },
        {
            id: 3,
            line: 'I take exciting challenges 🎯'
        },
        {
            id: 4,
            line: 'I like lots of sweets 🍰'
        },
        {
            id: 5,
            line: 'Shy but improving 😊'
        },
    ]

    return (
        <WavyBackground className="max-w-4xl mx-auto pb-40">
            <p className="text-lg md:text-2xl lg:text-4xl text-center font-bold !text-white">Hi, I&apos;m</p>
            <h1 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
                Aayush Kumar Kumawat
            </h1>
            <p className="relative text-base md:text-lg mt-6 text-white font-normal text-center flex">
                {
                    myHeadlines.map(headline => (
                        <span
                            key={headline['id']}
                            className={`absolute opacity-0 animate-txt-slide-${headline['id']} w-full`}
                        >
                            {headline['line']}
                        </span>
                    ))
                }
            </p>
        </WavyBackground>
    );
}