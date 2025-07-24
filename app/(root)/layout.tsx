import {ReactNode} from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata = {
    title: 'اپلیکیشن پیتزای من',
    description: 'سفارش آنلاین پیتزای داغ و خوشمزه',
};

export default function Layout({children}: { children: ReactNode }) {
    return (
        <>
            <Header/>
            <main className="pt-14 md:pt-17">
                {children}
            </main>
            <Footer/>
        </>
    )
}
