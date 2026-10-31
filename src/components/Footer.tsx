export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xl font-semibold text-white">🛒 বাজার দর</p>
        <p className="text-sm mt-2">
          প্রতিদিনের বাজার দরের সর্বশেষ তথ্য, এক জায়গায়।
        </p>
        <p className="text-xs text-gray-500 mt-4">
          © {new Date().getFullYear()} Bazar Dor. এই তথ্য শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে।
        </p>
      </div>
    </footer>
  );
}