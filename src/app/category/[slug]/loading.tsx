export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="skeleton h-8 w-40"></div>
        <div className="skeleton h-10 w-48"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton h-36 w-full"></div>
        ))}
      </div>
    </div>
  );
}