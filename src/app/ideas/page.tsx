// app/ideas/page.tsx (Server Component)
import pool from "@/lib/db";
import IdeasClient from "./IdeasClient";

export const metadata = {
  title: "Идеи для стартапов",
  description: "Каталог идей с фильтрацией и поиском", //TODO можно сделать generateMetadata в этот роут, чтобы title/description формировались динамически из данных идеи
};

export default async function IdeasPage() {
  const sql = `
    SELECT
        i.id AS idea_id,
        i.summary,
        i.problem,
        i.personas,
        i.solution,
        i.gtm,
        i.risks,
        i.monetization,
        i.kpis,
        i.score,
        i.created_at,
        i.sources
      FROM ideas i
      WHERE i.summary NOT LIKE 'Automated assistant to remove the top%'
      ORDER BY i.created_at DESC;
  `;
  const { rows: ideas } = await pool.query(sql);

  return <IdeasClient initialIdeas={ideas} />;
}
