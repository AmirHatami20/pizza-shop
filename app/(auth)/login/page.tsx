'use client';

import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import AuthForm from "@/components/Helper/AuthForm";
import {useState} from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (data: { email: string, password: string }) => {
        setLoading(true);

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });


            if (res?.ok) {
                router.push('/');
            } else if (res?.status === 401) {
                toast.error('نام کاربری یا رمز عبور اشتباه است.');
            } else {
                toast.error('مشکلی پیش آمده است.')
            }
        } catch {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }

    };

    return (
        <AuthForm
            mode="login"
            title="ورود"
            onSubmit={handleLogin}
            loading={loading}
        />
    );
}
