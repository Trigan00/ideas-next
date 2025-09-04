// app/ideas/[id]/page.tsx (Server Component)
import { supabase } from "@/lib/db";
import Details from "./Details";

export const metadata = {
  title: "Идея",
  description: "Детали идеи для стартапа", //TODO поменять
};

export default async function IdeaPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <Details id={id} />;
}
