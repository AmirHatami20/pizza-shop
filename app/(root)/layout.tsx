import {ReactNode} from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata = {
    title: 'اپلیکیشن پیتزای من',
    description: 'سفارش آنلاین پیتزای داغ و خوشمزه',
};

export default function Layout({children}: { children: ReactNode }) {
    return (
        <section className="flex flex-col items-center min-h-screen">
            <Header/>
            <main className="flex-1 w-full items-center justify-center mt-14 flex md:mt-17">
                {children}
            </main>
            <Footer/>
        </section>
    )
}
