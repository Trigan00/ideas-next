// app/ideas/IdeasClient.tsx
"use client";

import Card from "@/componets/UI/Card";
import SkeletonCard from "@/componets/UI/SkeletonCard";
import Tag from "@/componets/UI/Tag";
import formatDate from "@/helpers/formateDate";
import { IdeaRow } from "@/types/types";
import { Search, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useIdeas } from "@/lib/hooks/useIdeas";

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

//TODO Можно добавить пагинацию, infinite scroll и пр.

export default function IdeasClient() {
  const router = useRouter();

  const [q, setQ] = useState("");

  const { data: ideas, isLoading, error } = useIdeas(q);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-50">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-950/50 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-3">
          <Sparkles className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Idea Explorer</h1>
          <div className="ml-auto relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search ideas..."
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
        {error && <div className="text-red-600">Failed to load ideas</div>}
        {ideas && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ideas.map((idea) => {
              const subs = unique(
                (idea.sources || [])
                  .map((s) => s.subreddit || "")
                  .filter(Boolean)
              );
              return (
                <Card
                  key={idea.id}
                  onClick={() => router.push(`/ideas/${idea.id}`)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold leading-snug">
                      {idea.summary}
                    </h3>
                    <div className="shrink-0 flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4" />
                      <span className="text-sm">{idea.score.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {idea.problem}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {subs.length ? (
                      subs.map((s) => <Tag key={s}>r/{s}</Tag>)
                    ) : (
                      <Tag>no-subreddit</Tag>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Created {formatDate(idea.created_at)}</span>
                    <span>{idea.sources?.length || 0} sources</span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
