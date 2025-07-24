'use client'

import {
    FiFolder,
    FiHome,
    FiX
} from "react-icons/fi";
import {AiOutlineProduct} from "react-icons/ai";
import {useState} from "react";
import {IoIosMenu} from "react-icons/io";
import Link from "next/link";
import Overlay from "@/components/Helper/Overlay";
import {usePathname, useRouter} from "next/navigation";
import {IoExitOutline} from "react-icons/io5";

const navigationItems = [
    {name: 'داشبورد', href: '/admin', icon: FiHome},
    {name: 'محصولات', href: '/admin/product', icon: AiOutlineProduct},
    {name: 'دسته‌بندی‌ها', href: '/admin/category', icon: FiFolder}
];

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    return (
        <aside>
            <div className={`fixed h-full right-0 z-30 w-64 bg-white shadow-xl duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : 'translate-x-full'
            } lg:translate-x-0`}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-6 bg-primary">
                    <h1 className="text-xl font-bold text-white">پنل مدیریت</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white hover:text-gray-200"
                    >
                        <FiX className="w-6 h-6"/>
                    </button>
                </div>
                {/* Nav */}
               <div className="flex flex-col justify-between h-[92%] py-6 px-4">
                   <ul className="flex flex-col space-y-2">
                       {navigationItems.map((item) => {
                           const Icon = item.icon;
                           const isActive = pathname === item.href

                           return (
                               <li key={item.name}>
                                   <Link
                                       href={item.href}
                                       className={`flex items-center px-4 gap-x-2 py-3 text-sm font-medium rounded-lg transition-colors ${
                                           isActive
                                               ? 'bg-primary/10 text-primary border-r-4 border-primary'
                                               : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                       }`}
                                   >
                                       <Icon className="text-lg"/>
                                       <span>{item.name}</span>
                                   </Link>
                               </li>
                           )
                       })}
                   </ul>
                   <button className="primary-button w-full" onClick={() => router.push('/') }>
                       <IoExitOutline className="text-xl"/> خروج
                   </button>
               </div>

            </div>
            {sidebarOpen && (
                <Overlay
                    closeOverlay={() => setSidebarOpen(false)}
                />
            )}
            {/* Mobile Trigger */}
            <button className="lg:hidden p-3" onClick={() => setSidebarOpen(true)}>
                <IoIosMenu className="text-5xl"/>
            </button>
        </aside>

    );
}
