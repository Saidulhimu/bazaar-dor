export default function SortDropdown({
  sortBy,
  onSortChange,
}: {
  sortBy: string;
  onSortChange: (value: string) => void;
}) {
  return (
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      className="select select-bordered select-sm w-full max-w-xs"
    >
      <option value="default">সাজান: ডিফল্ট</option>
      <option value="price-asc">দাম: কম থেকে বেশি</option>
      <option value="price-desc">দাম: বেশি থেকে কম</option>
    </select>
  );
}