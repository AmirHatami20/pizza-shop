import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#f13a01] text-white py-8 px-4">
            <div className="container flex flex-col md:flex-row justify-between items-center gap-6 font-semibold">
                {/* Logo */}
                <div className="flex flex-col items-center md:items-start">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        width={50}
                        height={50}
                    />
                    <p className="mt-2 text-center md:text-left">پیتزا، حال خوب هر روز 🍕</p>
                </div>

                {/* Links */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link href="/" className="hover:underline">تماس با ما</Link>
                    <Link href="/" className="hover:underline">درباره ما</Link>
                    <Link href="/menu" className="hover:underline">منو</Link>
                    <Link href="/" className="hover:underline">سوالات متداول</Link>
                </div>

                {/* Copyright */}
                <div className="text-center md:text-right text-sm">
                    © {new Date().getFullYear()} تمام حقوق محفوظ است 🍕
                </div>
            </div>
        </footer>
    );
}
