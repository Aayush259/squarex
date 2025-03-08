import { Basic1TemplateData, Basic2TemplateData, Intermediate1TemplateData, ITemplates } from "./interfaces"

export const templateNames = {
    Basic1Template: "Basic1Template",
    Basic2Template: "Basic2Template",
    Intermediate1Template: "Intermediate1Template",
}

export const IDs = {
    B1: "b1",
    PROJECTS: "projects",
    SKILLS: "skills",
    CONTACT: "contact",
    ABOUT: "about",
}

export const basic1TemplateExampleData: { type: "basic1template", data: Basic1TemplateData } = {
    type: "basic1template",
    data: {
        home: {
            title: "Home",
            name: "Aayush",
            role: "Creative Technologist",
            bio: "I'm a creative technologist based in India. I love to create beautiful and functional websites. I'm currently working at a startup called MyStartup. I'm also a part-time freelancer and I love to work with startups that are building the future.",
            image: "/MyImg.jpeg"
        },
        work: {
            title: "My Work",
            projects: [
                {
                    title: "Square: Real-time chat app",
                    description: "Square is a real-time chat application built using modern web technologies. It allows users to connect, chat, and manage profiles with seamless updates and an intuitive user interface.",
                    image: "/slider1.jpg",
                    url: "/"
                },
                {
                    title: "Square: Real-time chat app",
                    description: "Square is a real-time chat application built using modern web technologies. It allows users to connect, chat, and manage profiles with seamless updates and an intuitive user interface.",
                    image: "/slider2.jpg",
                    url: "/"
                },
                {
                    title: "Square: Real-time chat app",
                    description: "Square is a real-time chat application built using modern web technologies. It allows users to connect, chat, and manage profiles with seamless updates and an intuitive user interface.",
                    image: "/slider1.jpg",
                    url: "/"
                },
            ]
        },
        skills: ["JavaScript", "TypeScript", "Next JS", "React JS", "Tailwind CSS", "MERN Stack"],
        social: [
            {
                platform: "LinkedIn",
                url: "/",
            },
            {
                platform: "GitHub",
                url: "/",
            },
            {
                platform: "Instagram",
                url: "/",
            },
            {
                platform: "Twitter",
                url: "/",
            },
            {
                platform: "Facebook",
                url: "/",
            },
        ],
    }
}

export const basic2TemplateExampleData: { type: "basic2template", data: Basic2TemplateData } = {
    type: "basic2template",
    data: {
        home: {
            title: "Home",
            name: "👋 Hi! There, I'm Sathya,",
            role: "UI UX Designer & Web Designer",
            bio: "I Design Beautifully Simple Things And I Love What I Do. Just Simple Like That!"
        },
        about: {
            title: "About Me",
            descriptionPart1: "Hello! I'm Sathya Narayanan, a passionate and creative UI/UX designer ready to embark on a journey of shaping exceptional digital experiences. With a fresh perspective and a keen eye for detail, I bring enthusiasm and dedication to every project I undertake.",
            descriptionPart2: "I have honed my skills in user research, wireframing, prototyping, and visual design. I am excited to apply my knowledge and creativity to solve complex design challenges and create intuitive and visually appealing interfaces"
        },
        work: {
            title: "Selected Works",
            projects: [
                {
                    title: "HEED",
                    description: "UI UX Case Study",
                    image: "/templateImages/heed.avif",
                    url: "/",
                },
                {
                    title: "Fly way",
                    description: "Travel Agency Website Design",
                    image: "/templateImages/fly_Way.avif",
                    url: "/",
                },
                {
                    title: "Sushi Restaurant",
                    description: "Social Media Poster Design",
                    image: "/templateImages/sushi.avif",
                    url: "/",
                },
                {
                    title: "Shoppy Bag",
                    description: "Shoppy Bag",
                    image: "/templateImages/shoppy.avif",
                    url: "/",
                }
            ]
        },
        skills: {
            title: "What I Do!",
            subtitle: "My Specialization And Key Skills",
            skills: ["UI/UX Design", "Photoshop", "Illustrator", "Figma", "Web Design", "Logo Design"]
        },
        social: [
            {
                platform: "LinkedIn",
                url: "/",
            },
            {
                platform: "GitHub",
                url: "/",
            },
            {
                platform: "Instagram",
                url: "/",
            },
            {
                platform: "Twitter",
                url: "/",
            },
            {
                platform: "Facebook",
                url: "/",
            },
        ]
    }
}

export const intermediate1TemplateExampleData: { type: "intermediate1template", data: Intermediate1TemplateData } = {
    type: "intermediate1template",
    data: {
        home: {
            name: "Aayush Kumar Kumawat",
            headlines: ["A Full-stack Developer 🖥️", "A Tech enthusiast 🚀", "I take exciting challenges 🎯", "I like lots of sweets 🍰", "Shy but improving 😊"]
        },
        about: {
            descriptionPart1: "Hello! I'm Aayush, a tech enthusiast and passionate code who is eager to learn and tackle new challenges. I value simplicity and creativity, and I strive to reflect these traits in my work. Whether I'm building innovative solutions or exploring new technologies, I'm dedicated to growing as a developer and contributing to the tech community.",
            descriptionPart2: "I have honed my skills in modern technologies like React, Next.js, TypeScript, Node,js, Express. Tailwind CSS and more. My projects often incorporate advanced features like real-time updates with sockets and secure JWT-based authentication. I am excited to apply my knowledge and creativity.",
        },
        projects: [
            {
                name: "HEED",
                description: "UI UX Case Study",
                image: "/templateImages/heed.avif",
                gitHubLink: "https://github.com/username/project",
                url: "/",
            },
            {
                name: "Fly way",
                description: "Travel Agency Website Design",
                image: "/templateImages/fly_Way.avif",
                gitHubLink: "https://github.com/username/project",
                url: "/",
            },
            {
                name: "Sushi Restaurant",
                description: "Social Media Poster Design",
                image: "/templateImages/sushi.avif",
                gitHubLink: "https://github.com/username/project",
                url: "/",
            },
            {
                name: "Shoppy Bag",
                description: "Shoppy Bag",
                image: "/templateImages/shoppy.avif",
                gitHubLink: "https://github.com/username/project",
                url: "/",
            }
        ],
        social: [
            {
                platform: "GitHub",
                url: "/",
            },
            {
                platform: "LinkedIn",
                url: "/",
            },
            {
                platform: "Twitter",
                url: "/",
            },
            {
                platform: "Instagram",
                url: "/",
            },
            {
                platform: "Facebook",
                url: "/",
            }
        ]
    }
}

export const templates: ITemplates[] = [
    {
        name: "basic1template",
        description: "A simple and clean template for beginners in their journey.",
        image: "/templates/basic1template.webp",
    },
    {
        name: "basic2template",
        description: "Sleek, minimalist portfolio template with clean layout, intuitive navigation, and engaging contact features to showcase work elegantly.",
        image: "/templates/basic2template.webp",
    },
    {
        name: "intermediate1template",
        description: "A template with a clean and modern design, featuring cool animations.",
        image: "/templates/intermediate1template.webp",
    }
]
