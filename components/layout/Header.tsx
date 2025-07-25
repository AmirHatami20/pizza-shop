'use client';

import {useState} from 'react';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import {HiBars2} from "react-icons/hi2";
import {PiShoppingCartSimple} from "react-icons/pi";
import {usePathname} from "next/navigation";
import {useAPI} from "@/hook/useAPI";
import {toPersianNumber} from "@/util/helper";

const headerLinks = [
    {title: "صفحه اصلی", href: "/"},
    {title: "منو ها", href: "/menu"},
    {title: "درباره ما", href: "/about"},
    {title: "ارتباط با ما", href: "/contact"},
];

export default function Header() {
    const [showSidebar, setShowSidebar] = useState(false);

    const {useGetCart} = useAPI()
    const {data: cartData} = useGetCart()
    const cartCount = cartData?.length

    const pathname = usePathname();
    const {data: session} = useSession();

    return (
        <header className="fixed z-50 right-0 left-0 h-12 md:h-[70px] bg-white backdrop-blur-xl shadow-sm">
            <div className="container flex items-center h-full justify-between">
                {/* Mobile bar */}
                <div className="md:hidden">
                    <button onClick={() => setShowSidebar(true)}>
                        <HiBars2/>
                    </button>
                </div>

                {/* Logo & Links */}
                <div className="flex gap-x-5 items-center">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        AH PIZZA
                    </Link>
                    <nav className="hidden md:flex items-center gap-x-5">
                        {headerLinks.map((link, index) => {
                            const isActive = link.href === pathname;
                            return (
                                <Link href={link.href} key={index} className={isActive ? "text-primary" : ""}>
                                    {link.title}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Auth */}
                <div className="flex items-center gap-x-5">

                    <div className="hidden md:flex items-center gap-x-3">
                        {session?.user ? (
                            <>
                                <Link href="/admin"
                                      className="flex items-center border rounded-full py-1.5 px-5 border-gray-500 text-gray-800 hover:bg-gray-400 hover:text-white transition-colors">
                                    پنل ادمین
                                    <span className="pt-1 mr-1">({session.user.name})</span>
                                </Link>
                                <button onClick={() => signOut()} className="primary-button">
                                    خروج
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">ورود</Link>
                                <Link href="/register" className="primary-button">ثبت نام</Link>
                            </>
                        )}
                    </div>
                    {/* Cart */}
                    <Link href="/cart" className="relative">
                        <div
                            className="absolute bg-primary text-white text-sm flex items-center justify-center w-4 h-4 rounded-full -top-1 -right-1"
                        >
                            {session?.user ? toPersianNumber(cartCount) || toPersianNumber(0) : toPersianNumber(0)}
                        </div>
                        <PiShoppingCartSimple className="text-2xl md:text-3xl"/>
                    </Link>
                </div>
            </div>

            {/* Overlay */}
            {showSidebar && (
                <div
                    className="fixed top-0 min-h-screen w-full right-0 left-0 inset-0 bg-black/40 z-40"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 w-64 min-h-screen h-full bg-[#f13a01] text-white z-50 transition-transform duration-300 transform ${
                    showSidebar ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex justify-between items-center px-4 py-3 border-b border-white">
                    <h2 className="text-xl font-bold">منو</h2>
                    <button onClick={() => setShowSidebar(false)} className="text-2xl leading-none">
                        ×
                    </button>
                </div>

                <nav className="flex flex-col gap-4 px-6 py-4">
                    {/* Cart */}
                    <Link href="/cart">
                        <PiShoppingCartSimple className="text-2xl md:text-3xl"/>
                    </Link>

                    {headerLinks.map((link, index) => {
                        const isActive = link.href === pathname

                        return (
                            <Link
                                key={index}
                                href={link.href}
                                onClick={() => setShowSidebar(false)}
                                className={`text-lg font-medium hover:underline ${isActive ? 'text-gray-800' : ""}`}
                            >
                                {link.title}
                            </Link>
                        )
                    })}
                </nav>

                <div className="px-6 py-4 border-t border-white mt-auto">
                    {session?.user ? (
                        <div className="flex flex-col gap-y-1 font-semibold">
                            <p className="mb-2">سلام، {session.user.name}</p>
                            <button
                                onClick={() => {
                                    signOut();
                                    setShowSidebar(false);
                                }}
                                className="w-full py-2 px-4 bg-white text-[#f13a01] rounded"
                            >
                                خروج
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-y-1 font-semibold">
                            <Link href="/login" onClick={() => setShowSidebar(false)} className="block mb-2">
                                ورود
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setShowSidebar(false)}
                                className="block"
                            >
                                ثبت ‌نام
                            </Link>
                        </div>
                    )}
                </div>
            </aside>
        </header>
    );
}
