import React, {ChangeEvent, useState} from 'react';
import {signIn} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface AuthFormProps {
    mode: string;
    title: string;
    onSubmit: (data: { email: string; password: string; name?: string }) => void;
    loading: boolean;
}

export default function AuthForm({mode, title, onSubmit, loading}: AuthFormProps) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevState => ({...prevState, [name]: value}));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit(form);
    };

    const handleGoogleLogin = async () => {
        const res = await signIn('google', {
            callbackUrl: '/',
            redirect: false
        });

        if (res?.error) {
            console.error('Google login failed:', res.error);
        } else if (res?.ok && res.url) {
            router.push(res.url); // بدون reload، فقط روت React تغییر می‌کنه
        }
    };


    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h1 className="auth-title">
                {title}
            </h1>

            {mode === 'register' && (
                <input
                    type="text"
                    name="name"
                    placeholder="نام و نام خانوادگی..."
                    value={form.name}
                    onChange={handleChange}
                    className="auth-input"
                />
            )}
            <input
                className="auth-input"
                name="email"
                placeholder="آدرس ایمیل..."
                value={form.email}
                onChange={handleChange}
                required
            />
            <input
                className="auth-input"
                name="password"
                type="password"
                placeholder="رمز عبور..."
                value={form.password}
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                className="primary-button"
                disabled={loading}
            >
                {loading ? 'لطفاً صبر کنید...' : (mode === 'register' ? 'ثبت نام' : 'ورود')}
            </button>


            <div className="bg-gray-300 w-full h-[2px]"></div>

            <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                >
                    <path fill="#fbc02d"
                          d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.5-5.8 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.9-5.9C34.3 6.4 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-3.5z"/>
                    <path fill="#e53935"
                          d="M6.3 14.1l6.6 4.8C14.5 15.2 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.9-5.9C34.3 6.4 29.4 4 24 4 16.1 4 9.2 8.8 6.3 14.1z"/>
                    <path fill="#4caf50"
                          d="M24 44c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.2c-2 1.5-4.5 2.4-7.4 2.4-5.4 0-9.9-3.5-11.4-8.3l-6.5 5c3 5.8 9 9.9 16 9.9z"/>
                    <path fill="#1565c0"
                          d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2.1-2.1 3.9-3.8 5.2l6.4 5.2c1.6-1.5 2.9-3.3 3.8-5.4 0.9-2.1 1.4-4.4 1.4-6.8 0-1.3-.1-2.7-.4-3.5z"/>
                </svg>
                <span className="font-medium">ورود با گوگل</span>
            </button>
            <p className="flex gap-x-1 items-center justify-center">
                {mode === 'register' ? (
                    <>
                        قبلا اکانت ساخته اید؟
                        <Link href="/login" className="text-primary">ورود</Link>
                    </>
                ) : (
                    <>
                        هنوز اکانت نساخته اید؟
                        <Link href="/register" className="text-primary">ثبت نام</Link>
                    </>
                )}
            </p>

        </form>
    );
}