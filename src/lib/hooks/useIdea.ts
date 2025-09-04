// lib/hooks/useIdea.ts
import { useQuery } from "@tanstack/react-query";
import { IdeaRow } from "@/types/types";

async function fetchIdea(id: string): Promise<IdeaRow> {
  const res = await fetch(`/api/ideas/${id}`);
  if (!res.ok) throw new Error("Failed to fetch idea");
  return res.json();
}

export function useIdea(id: string) {
  return useQuery<IdeaRow, Error>({
    queryKey: ["idea", id],
    queryFn: () => fetchIdea(id),
    enabled: !!id, // запрос только если id есть
  });
}
