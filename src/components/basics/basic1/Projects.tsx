import Image from "next/image";
import Link from "next/link";

const Basic1Projects = () => {

    const projects = [
        {
            name: "Square: Real-time chat app",
            imageUrl: "/slider1.jpg",
            description: "Square is a real-time chat application built using modern web technologies. It allows users to connect, chat, and manage profiles with seamless updates and an intuitive user interface.",
            link: "/",
        },
        {
            name: "Square: Real-time chat app",
            imageUrl: "/slider2.jpg",
            description: "Square is a real-time chat application built using modern web technologies. It allows users to connect, chat, and manage profiles with seamless updates and an intuitive user interface.",
            link: "/",
        },
        {
            name: "Square: Real-time chat app",
            imageUrl: "/slider1.jpg",
            description: "Square is a real-time chat application built using modern web technologies. It allows users to connect, chat, and manage profiles with seamless updates and an intuitive user interface.",
            link: "/",
        }
    ];

    return (
        <section className="w-full px-5 py-5 md:px-36">
            <h2 className="text-xl md:text-2xl font-semibold">
                {"Recent Projects"}
            </h2>

            {
                projects.map((project, index) => (
                    <div key={index} className="w-full flex flex-col md:flex-row md:gap-8 my-8">
                        <Image src={project.imageUrl} alt={project.name} width={300} height={300} className="rounded-xl object-cover object-top w-full md:w-[250px] h-[200px]" />

                        <div className="py-4">
                            <p className="font-semibold text-xl">
                                {project.name}
                            </p>

                            <Link href={project.link} className="w-fit text-xs border border-black bg-black text-white rounded-full py-1 px-3 mt-1 mb-2.5 block relative hover:text-black duration-500 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0 before:rounded-full before:bg-white before:duration-500 hover:before:w-full hover:before:left-0">
                                <span className="relative z-10">
                                    {"Visit here"}
                                </span>
                            </Link>

                            <p className="max-w-[600px]">
                                {project.description}
                            </p>
                        </div>
                    </div>
                ))
            }


        </section>
    );
};

export default Basic1Projects;
