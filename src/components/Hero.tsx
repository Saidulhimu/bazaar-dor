import Link from "next/link";
import Image from "next/image";
import BanglaDate from "./BanglaDate";

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-green-50 to-green-100 container mx-auto">
            <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-center gap-8">
                   <div className="flex-1 text-center lg:text-left">
                    <span className="inline-block bg-white text-green-700 text-sm px-3 py-1 rounded-full shadow-sm mb-4">
                        📅 <BanglaDate />
                    </span>
                    <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                        আজকের বাজারের দাম এক নজরে
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস — সব পণ্যের আজকের দাম, গতকালের
                        তুলনায় পরিবর্তন সহ, এক জায়গায় দেখুন।
                    </p>
                    <a
                        href="#সব-পণ্য"
                        className="btn btn-success text-white px-6"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>

                <div className="flex-1 flex justify-center">
                    <Image
                        src="/bazar-hero.png"
                        alt="বাজার দর"
                        width={450}
                        height={350}
                        priority
                        className="w-full max-w-md h-auto"
                    />
                </div>
            </div>
        </section>
    );
}