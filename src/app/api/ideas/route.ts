// app/api/ideas/route.ts
import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const minScore = Number(searchParams.get("minScore") || 0);
    const maxScore = Number(searchParams.get("maxScore") || 100);

    let query = supabase
      .from("ideas")
      .select(
        `
        id,
        summary,
        problem,
        personas,
        solution,
        gtm,
        risks,
        monetization,
        kpis,
        score,
        created_at,
        sources
      `
      )
      .not("summary", "like", "Automated assistant to remove the top%") //TODO search not Automated assistant..
      .gte("score", minScore)
      .lte("score", maxScore)
      .order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("summary", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Error fetching ideas:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
