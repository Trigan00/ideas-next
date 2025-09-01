// app/ideas/[id]/page.tsx (Server Component)
import pool from "@/lib/db";
import Details from "./Details";

export const metadata = {
  title: "Идея",
  description: "Детали идеи для стартапа", //TODO поменять
};

export default async function IdeaPage({ params }: { params: { id: string } }) {
  const { id } = await params;
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
      WHERE i.id=$1;
  `;
  const { rows } = await pool.query(sql, [id]);

  if (!rows.length) {
    return <div>Идея не найдена</div>;
  }

  return <Details idea={rows[0]} />;
}
