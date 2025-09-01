// app/ideas/[id]/page.tsx (Server Component)
import { supabase } from "@/lib/db";
import Details from "./Details";

export const metadata = {
  title: "Идея",
  description: "Детали идеи для стартапа", //TODO поменять
};

export default async function IdeaPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: idea, error } = await supabase
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
    .eq("id", id) // WHERE i.id = $1
    .single(); // т.к. одна запись

  if (error) {
    console.error(error);
    return <div>Ошибка загрузки идеи</div>;
  }

  if (!idea) {
    return <div>Идея не найдена</div>;
  }

  return <Details idea={idea as any} />;
}
