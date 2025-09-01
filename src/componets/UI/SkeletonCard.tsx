export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800 p-5 border border-gray-200 dark:border-gray-800">
      <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="mt-3 h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="mt-6 flex gap-2">
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
