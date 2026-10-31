export default function ProductLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      <div className="skeleton h-5 w-64 mb-6"></div> {/* breadcrumb */}
      <div className="skeleton h-32 w-full rounded-xl mb-6"></div> {/* summary card */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-20 w-full"></div>
        ))}
      </div>
      <div className="skeleton h-7 w-48 mb-4"></div>
      <div className="skeleton h-40 w-full mb-6"></div>
      <div className="skeleton h-7 w-40 mb-4"></div>
      <div className="skeleton h-24 w-full"></div>
    </div>
  );
}