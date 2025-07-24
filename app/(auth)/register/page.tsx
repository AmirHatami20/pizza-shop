'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import AuthForm from "@/components/Helper/AuthForm";
import toast from "react-hot-toast";
import {API_PATH} from "@/constant/apiPath";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: { name?: string, email: string, password: string }) => {
        setLoading(true);
        try {
            const res = await fetch(API_PATH.AUTH.REGISTER, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/login');
            } else {
                const error = await res.json();
                toast.error(error.error);
            }
        } catch {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthForm
            mode="register"
            title="ثبت نام"
            onSubmit={handleSubmit}
            loading={loading}
        />
    );
}
