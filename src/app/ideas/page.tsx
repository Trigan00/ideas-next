// app/ideas/page.tsx
import { supabase } from "@/lib/db";
import IdeasClient from "./IdeasClient";
import { IdeaRow } from "@/types/types";

export const metadata = {
  title: "Идеи для стартапов",
  description: "Каталог идей с фильтрацией и поиском",
};

export default async function IdeasPage() {
  const { data: ideas, error } = await supabase
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
    .not("summary", "like", "Automated assistant to remove the top%")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return <IdeasClient initialIdeas={(ideas ?? []) as any} />;
}
