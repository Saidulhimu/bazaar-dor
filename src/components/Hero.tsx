import Image from "next/image";
import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 lg:p-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        <div className="flex-1 text-center lg:text-left min-w-0">
          <span className="inline-flex items-center gap-1 bg-gray-50 text-green-700 text-xs sm:text-sm px-3 py-1 rounded-full border border-gray-100 mb-4">
            📅 <BanglaDate />
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস — সব পণ্যের আজকের দাম, গতকালের
            তুলনায় পরিবর্তন সহ, এক জায়গায় দেখুন।
          </p>
          <a href="#সব-পণ্য" className="btn btn-success text-white px-6">
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="shrink-0 w-48 sm:w-64 lg:w-80">
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর"
            width={320}
            height={260}
            priority
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}