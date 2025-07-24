import React from 'react';
import {Product} from '@/types'
import {toPersianNumber} from "@/util/helper";

export default function ProductCard(props: Product) {
    const {name, image, basePrice, description} = props;

    return (
        <div className="flex flex-col space-y-3 p-5 bg-gray-200 w-full rounded-lg justify-between text-center">
            <div className="w-2/3 mx-auto ">
                <img
                    src={image}
                    alt={name}
                    height={200}
                    width={200}
                    className="w-full h-auto max-h-[150px]"
                />
            </div>
            <h3 className="font-bold text-2xl">
                {name}
            </h3>
            <p className="text-black/70 line-clamp-3">{description}</p>
            <p>
                قیمت:
                <span className="text-primary font-semibold text-lg mr-1.5">{toPersianNumber(basePrice, true)}</span>
            </p>
            <button className="primary-button !py-3">
                اضافه کردن به سبد خرید
            </button>
        </div>
    );
}