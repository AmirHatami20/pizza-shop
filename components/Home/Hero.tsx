import Image from "next/image";
import {PiArrowCircleLeft} from "react-icons/pi";

export default function Hero() {
    return (
        <section className="container grid grid-cols-1 md:grid-cols-2 md:mt-4 overflow-hidden">
            {/* Text Section */}
            <div className="py-4 md:py-8 text-center md:text-right">
                <h1 className="text-5xl lg:text-6xl tracking-wider leading-[1.3] font-semibold">
                    هیچ چیزی تو دنیا <br/>
                    پیدا نمی‌شه که با <br/>
                    <span className="text-primary">پیتزای داغ </span>
                    بهتر نشه
                </h1>
                <p className="my-6 text-gray-500 text-base md:text-lg leading-relaxed">
                    پیتزا همون قطعه‌ی گمشده‌ایه که هر روز رو کامل می‌کنه؛ یه خوشی ساده و در عین حال خوشمزه که زندگی رو
                    شیرین‌تر می‌کنه
                </p>
                <div className="flex gap-4 text-sm justify-center md:justify-start">
                    <button
                        className="primary-button">
                        ثبت سفارش
                        <PiArrowCircleLeft className="text-2xl"/>
                    </button>
                    <button className="flex items-center gap-2 py-2 text-gray-600 font-semibold">
                        درباره ما
                        <PiArrowCircleLeft className="text-2xl"/>
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className="flex justify-center md:mr-auto relative">
                <Image
                    src="/pizza.png"
                    alt="پیتزای داغ و خوشمزه"
                    width={450}
                    height={450}
                    priority
                    className="h-auto animate-[spin_10s_linear_infinite]"
                />
            </div>
        </section>
    );
}
