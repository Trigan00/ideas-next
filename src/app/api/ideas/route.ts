import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const minScore = searchParams.get("minScore") || "0";
    const maxScore = searchParams.get("maxScore") || "100";

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
        AND i.summary ILIKE $1
        AND i.score BETWEEN $2 AND $3
      ORDER BY i.created_at DESC;
    `;

    const { rows } = await pool.query(sql, [`%${search}%`, minScore, maxScore]);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("Error fetching ideas:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
