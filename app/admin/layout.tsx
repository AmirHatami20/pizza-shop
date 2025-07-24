import {ReactNode} from "react";
import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
    title: 'پنل ادمین',
    description: 'سفارش آنلاین پیتزای داغ و خوشمزه',
};

export default function Layout({children}: { children: ReactNode }) {
    return (
        <>
            <Sidebar/>
            <main className="min-h-screen bg-gray-50 lg:mr-64 p-8">
                {children}
            </main>
        </>
    )
}
