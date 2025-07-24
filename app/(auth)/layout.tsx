import {ReactNode} from "react";
import Header from "@/components/layout/Header";

export const metadata = {
    title: 'احراز هویت در سایت ما',
    description: 'سفارش آنلاین پیتزای داغ و خوشمزه',
};


export default function Layout({children}: { children: ReactNode }) {
    return (
        <>
            <Header/>
            <main className="min-h-screen flex justify-center items-center">
                {children}
            </main>
        </>
    )
}
