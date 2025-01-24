import { Geist, Geist_Mono, Heebo, Playfair_Display, Poppins, Outfit, Aldrich, Overlock } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import Session from "@/components/Session";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const heebo = Heebo({
    variable: "--font-heebo",
    subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
    variable: "--font-playfair-display",
    subsets: ["latin"],
});

const poppins = Poppins({
    weight: "400",
    variable: "--font-poppins",
    subsets: ["latin"],
});

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

const aldrich = Aldrich({
    weight: "400",
    variable: "--font-aldrich",
    subsets: ["latin"],
});

const overlock = Overlock({
    weight: "400",
    variable: "--font-overlock",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${heebo.variable} ${playfairDisplay.variable} ${poppins.variable} ${aldrich.variable} ${outfit.variable} ${overlock.variable} antialiased`}
            >
                <StoreProvider>
                    <Session>
                        {children}
                    </Session>
                </StoreProvider>
            </body>
        </html>
    );
};
