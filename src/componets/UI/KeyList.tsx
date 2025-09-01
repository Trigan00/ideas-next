export default function KeyList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const clean = items.filter(Boolean);
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/50">
      <h3 className="text-lg font-semibold">{title}</h3>
      {clean.length ? (
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-gray-700 dark:text-gray-200">
          {clean.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-gray-500">No data</p>
      )}
    </div>
  );
}
