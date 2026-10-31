export default function HomeLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
\      <div className="skeleton h-48 w-full rounded-xl mb-8"></div>

\      {[1, 2].map((section) => (
        <div key={section} className="mb-8">
          <div className="skeleton h-7 w-40 mb-4"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-36 w-full"></div>
            ))}
          </div>
        </div>
      ))}

\      <div>
        <div className="skeleton h-7 w-32 mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-36 w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}