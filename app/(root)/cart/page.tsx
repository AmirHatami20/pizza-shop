'use client';

import React from 'react';
import {useAPI} from "@/hook/useAPI";
import SectionHeader from "@/components/Helper/SectionHeader";
import {toPersianNumber} from "@/util/helper";
import {Product} from "@/types";
import {useSession, signIn} from "next-auth/react";
import {FaRegTrashAlt} from "react-icons/fa";

export default function Page() {
    const {status} = useSession();

    const isAuthenticated = status === "authenticated";

    const {useGetCart} = useAPI();
    const {data: cartItems = [], isLoading} = useGetCart()

    const totalQuantity = isAuthenticated && Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
        : 0;

    const totalPrice = isAuthenticated && Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => {
            const product = item.product as Partial<Product>;
            const price = product?.sizes?.find(size => item.size === size.label)?.price || 0;
            return sum + price * item.quantity;
        }, 0)
        : 0;

    if (status === "loading") {
        return <p className="text-center mt-6">در حال بررسی وضعیت ورود...</p>;
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center flex-col min-h-[600px] text-center mt-10">
                <p className="text-gray-600 mb-4">برای مشاهده سبد خرید ابتدا وارد حساب خود شوید.</p>
                <button
                    onClick={() => signIn()}
                    className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80 transition"
                >
                    ورود به حساب
                </button>
            </div>
        );
    }

    return (
        <div className="container  min-h-[620px]">
            <SectionHeader subHeader="" mainHeader="سبد خرید"/>

            {isLoading ? (
                <div className="flex h-full items-center justify-center">
                    <div
                        className="h-30 w-30 animate-spin rounded-full border-5 bg-white/30 backdrop-blur-xl border-dashed border-primary"/>
                </div>
            ) : (
                <div className="h-full">
                    {cartItems?.length === 0 && !isLoading ? (
                        <p className="text-center text-gray-600 mt-6">سبد خرید شما خالی است.</p>
                    ) : (
                        <div className="grid grid-cols-4 gap-6 mt-6">
                            <div className="col-span-4 md:col-span-3 flex flex-col space-y-3">
                                {cartItems?.map((item) => {
                                    const product = item?.product as Partial<Product>;

                                    return (
                                        <div
                                            key={product._id}
                                            className="flex items-center justify-between border border-gray-400 rounded-xl p-4 shadow-sm gap-3"
                                        >
                                            <div className="flex gap-4 items-center">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-32 max-h-[70px] object-cover rounded-md"
                                                />
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex gap-x-2 items-center">
                                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                                        <p className="text-gray-600 text-sm">سایز: {item.size}</p>
                                                    </div>
                                                    <p className="text-gray-700 text-sm">
                                                        قیمت: {toPersianNumber(product?.sizes?.find(s => s.label === item.size)?.price || 0, true)} تومان
                                                    </p>
                                                    <p className="text-gray-700 text-sm">
                                                        تعداد: {toPersianNumber(item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                className="rounded-full bg-red-600 w-10 h-10 text-white flex items-center justify-center"
                                            >
                                                <FaRegTrashAlt/>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Totals */}
                            <div
                                className="col-span-4 md:col-span-1 h-fit rounded-lg shadow-sm bg-white p-4 border border-gray-400">
                                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-3">اطلاعات پرداخت</h4>
                                <p className="flex items-center gap-x-1 text-gray-700 mb-2">مبلغ کل:
                                    <span className="text-primary font-semibold">{toPersianNumber(totalPrice)}</span>
                                </p>
                                <p className="flex items-center gap-x-1 text-gray-700 mb-2">تعداد کل:
                                    <span className="text-primary font-semibold">{toPersianNumber(totalQuantity)}</span>
                                </p>
                                <button
                                    className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80 transition">
                                    ادامه پرداخت
                                </button>
                            </div>
                        </div>

                    )}
                </div>
            )}
        </div>
    );
}
