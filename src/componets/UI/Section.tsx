export default function Section({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/50">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
        {body}
      </p>
    </div>
  );
}
