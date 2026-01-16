import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-poppins"
});

export const metadata: Metadata = {
    title: "Hotelmol - Ai Solutions for Hotels",
    description: "Advanced AI solutions for the hospitality industry.",
    openGraph: {
        title: "Hotelmol - Ai Solutions for Hotels",
        description: "Advanced AI solutions for the hospitality industry.",
        url: "https://hotelmol.com",
        siteName: "Hotelmol",
        images: [
            {
                url: "/assets/hotelmol-logo.png",
                width: 800,
                height: 600,
                alt: "Hotelmol Logo",
            },
        ],
        type: "website",
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
    },
};

export const viewport: Viewport = {
    themeColor: "#0752A0",
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="theme-color" content="#0752A0" />
            </head>
            <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
