// lib/hooks/useIdeas.ts
import { useQuery } from "@tanstack/react-query";
import { IdeaRow } from "@/types/types";

async function fetchIdeas(search: string): Promise<IdeaRow[]> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);

  const res = await fetch(`/api/ideas?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch ideas");
  return res.json();
}

export function useIdeas(search: string) {
  return useQuery<IdeaRow[], Error>({
    queryKey: ["ideas", search], // кеш будет зависеть от строки поиска
    queryFn: () => fetchIdeas(search),
    staleTime: 1000 * 60, // 1 минута кэш
    refetchOnWindowFocus: false,
  });
}
