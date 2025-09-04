// app/api/ideas/[id]/route.ts
import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  try {
    const params = await (context.params as any);
    const { id } = params as { id: string };

    const { data, error } = await supabase
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
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
