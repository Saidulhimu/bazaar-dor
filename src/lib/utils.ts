export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
}


export function formatPrice(price: number): string {
  const formatted = price.toLocaleString("en-IN"); // ১,৮৫০ এর ইংরেজি ভার্সন: 1,850
  return toBengaliNumber(formatted);
}


const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  pcs: "প্রতি পিস",
  piece: "প্রতি পিস",
};

export function getUnitBn(unit: string): string {
  return unitMap[unit.toLowerCase()] || unit;
}


const bnDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const bnMonths = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

export function getBanglaDate(): string {
  const now = new Date();
  const day = bnDays[now.getDay()];
  const date = toBengaliNumber(now.getDate());
  const month = bnMonths[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());
  return `${day}, ${date} ${month}, ${year}`;
}