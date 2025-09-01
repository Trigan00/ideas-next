export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-2xl border px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700">
      {children}
    </span>
  );
}
