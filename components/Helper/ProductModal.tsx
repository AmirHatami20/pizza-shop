import React, {useEffect, useState} from 'react';
import ModalWrapper from "@/components/Helper/ModalWrapper";
import {Product} from "@/types";
import {toPersianNumber} from "@/util/helper";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useAPI} from "@/hook/useAPI";

interface ProductModalProps {
    isOpenModal: boolean;
    handleClose: () => void;
    product: Product;
}

export default function ProductModal({isOpenModal, handleClose, product}: ProductModalProps) {
    const {name, image, description, sizes, _id} = product;

    const [productSize, setProductSize] = useState("");

    const {data: session} = useSession();

    const {useCreateCart} = useAPI();

    const createCartMutation = useCreateCart()

    useEffect(() => {
        if (isOpenModal) {
            setProductSize("");
        }
    }, [isOpenModal]);

    const handleSizeChange = (label: string) => {
        setProductSize(label);
    };

    const handleAddToCart = () => {
        if (!productSize) {
            toast.error("لطفاً یک سایز انتخاب کنید.");
            return;
        }
        if (!session?.user) {
            toast.error("ابتدا در سایت وارد شوید.")
            return;
        }

        createCartMutation.mutate({product: _id, size: productSize, quantity: 1,}, {
                onSuccess: () => {
                    toast.success("محصول به سبد خرید اضافه شد.");
                    handleClose();
                },
                onError: () => {
                    toast.error("خطا در اضافه کردن به سبد خرید.");
                },
            }
        );
    };

    return (
        <ModalWrapper
            title="اضافه کردن محصول به سبد"
            isOpenModal={isOpenModal}
            handleClose={handleClose}
        >
            <div className="flex flex-col items-center p-5 space-y-5">
                <img
                    src={image}
                    alt={name}
                    className="object-cover max-h-[110px] w-64"
                />
                <h3 className="text-2xl font-semibold">
                    {name}
                </h3>
                <p className='text-gray-600 text-base line-clamp-3 text-center'>{description}</p>

                <div className="flex flex-col items-center w-full gap-y-2">
                    <span className="text-lg font-semibold">انتخاب سایز</span>
                    <div className="flex flex-col w-full space-y-2">
                        {sizes.map((size) => (
                            <label
                                key={size.label}
                                onClick={() => handleSizeChange(size.label)}
                                className={`flex items-center gap-x-2 px-4 py-2 justify-start border rounded-lg cursor-pointer transition-all ${
                                    productSize === size.label ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="product-size"
                                    value={size.label}
                                    checked={productSize === size.label}
                                    onChange={() => handleSizeChange(size.label)}
                                />
                                <span className="w-6 capitalize text-blue-700">{size.label}</span>
                                <span className="text-gray-600">
                                    {toPersianNumber(size.price, true)} تومان
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    className="primary-button !py-3 w-full"
                    onClick={handleAddToCart}
                >
                    اضافه کردن به سبد خرید
                </button>
            </div>
        </ModalWrapper>
    );
}
