import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {FaInstagram, FaTelegram, FaPhone} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#f13a01] w-full text-white border-t border-orange-400 pt-10 pb-6 px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-medium">
                <div className="flex flex-col items-center md:items-start text-center md:text-right space-y-3">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        width={60}
                        height={60}
                    />
                    <p className="text-white/90">پیتزا، حال خوب هر روز 🍕</p>
                    <div className="flex items-center gap-4 text-white/80 mt-2">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="hover:text-white transition" size={20}/>
                        </a>
                        <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                            <FaTelegram className="hover:text-white transition" size={20}/>
                        </a>
                        <a href="tel:+989123456789">
                            <FaPhone className="hover:text-white transition" size={20}/>
                        </a>
                    </div>
                </div>

                {/* لینک‌ها */}
                <div className="flex flex-col items-center md:items-start gap-2 text-white/90">
                    <h4 className="text-white font-semibold mb-1">لینک‌های مفید</h4>
                    <Link href="/" className="hover:underline hover:text-white transition">تماس با ما</Link>
                    <Link href="/" className="hover:underline hover:text-white transition">درباره ما</Link>
                    <Link href="/menu" className="hover:underline hover:text-white transition">منو</Link>
                    <Link href="/" className="hover:underline hover:text-white transition">سوالات متداول</Link>
                </div>

                <div
                    className="flex flex-col items-center md:items-end text-center md:text-right text-white/80 justify-between">
                    <p className="text-sm">
                        © {new Date().getFullYear()} تمام حقوق محفوظ است 🍕
                    </p>
                    <p className="text-xs mt-1">طراحی شده با ❤️ در Next.js</p>
                </div>
            </div>
        </footer>
    );
}
