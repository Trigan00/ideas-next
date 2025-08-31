// app/ideas/page.tsx (Server Component)
import pool from "@/lib/db";
import IdeasClient from "./IdeasClient";

export const metadata = {
  title: "Идеи для стартапов",
  description: "Каталог идей с фильтрацией и поиском",
};

export default async function IdeasPage() {
  const sql = `
    SELECT
      i.id AS idea_id,
      i.summary,
      i.problem,
      i.solution,
      i.score,
      i.created_at
    FROM ideas i
    WHERE i.summary NOT LIKE 'Automated assistant to remove the top%'
    ORDER BY i.created_at DESC;
  `;
  const { rows: ideas } = await pool.query(sql);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Идеи</h1>
      {/* Передаем начальные данные клиентскому компоненту */}
      <IdeasClient initialIdeas={ideas} />
    </main>
  );
}
