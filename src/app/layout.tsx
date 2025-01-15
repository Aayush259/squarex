import { Geist, Geist_Mono, Heebo, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${heebo.variable} ${playfairDisplay.variable} ${poppins.variable} antialiased`}
            >
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
};
