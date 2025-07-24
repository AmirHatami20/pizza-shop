import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {Toaster} from "react-hot-toast";
import {ReactNode} from "react";
import {Vazirmatn} from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/Helper/ClinetLayout";

const vazir = Vazirmatn({
    subsets: ["arabic"],
    weight: ["400", "500", "700", "800"],
});

export default async function RootLayout({children}: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="fa" dir="rtl" className="scroll-smooth">
        <body className={vazir.className}>
        <ClientLayout session={session}>
            {children}
            <Toaster/>
        </ClientLayout>
        </body>
        </html>
    );
}
