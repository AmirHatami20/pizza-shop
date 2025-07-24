import React from 'react';
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#f13a01] text-white py-8 px-4">
            <div className="container flex flex-col md:flex-row justify-between items-center gap-6 font-semibold">
                {/* Logo */}
                <div className="flex flex-col items-center md:items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="32" fill="#fff"/>
                        <path d="M32 12 L48 52 L16 52 Z" fill="#f13a01"/>
                        <circle cx="32" cy="28" r="3" fill="#fff"/>
                        <circle cx="26" cy="38" r="2" fill="#fff"/>
                        <circle cx="38" cy="38" r="2" fill="#fff"/>
                        <path d="M32 12 Q30 26 20 32" stroke="#fff" strokeWidth="2" fill="none"/>
                    </svg>
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
