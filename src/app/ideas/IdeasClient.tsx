// app/ideas/IdeasClient.tsx
"use client";

import { useEffect, useState } from "react";

type Idea = {
  idea_id: number;
  summary: string;
  problem: string;
  solution: string;
  score: number;
  created_at: string;
};

export default function IdeasClient({
  initialIdeas,
}: {
  initialIdeas: Idea[];
}) {
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100);

  async function fetchIdeas() {
    const params = new URLSearchParams({
      search,
      minScore: String(minScore),
      maxScore: String(maxScore),
    });
    const res = await fetch(`/api/ideas?${params.toString()}`);
    const data = await res.json();
    setIdeas(data);
  }

  useEffect(() => {
    if (search || minScore !== 0 || maxScore !== 100) {
      fetchIdeas();
    } else {
      setIdeas(initialIdeas);
    }
  }, [search, minScore, maxScore]);

  return (
    <>
      {/* Фильтры */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Поиск по summary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-64"
        />
        <input
          type="number"
          placeholder="Min score"
          value={minScore}
          onChange={(e) => setMinScore(Number(e.target.value))}
          className="border rounded p-2 w-24"
        />
        <input
          type="number"
          placeholder="Max score"
          value={maxScore}
          onChange={(e) => setMaxScore(Number(e.target.value))}
          className="border rounded p-2 w-24"
        />
      </div>

      {/* Список идей */}
      <ul className="space-y-3">
        {ideas.length === 0 ? (
          <p className="text-gray-500">Нет идей по запросу</p>
        ) : (
          ideas.map((idea) => (
            <li key={idea.idea_id} className="p-4 border rounded-lg">
              <h2 className="font-semibold">{idea.summary}</h2>
              <p className="text-sm text-gray-600">{idea.problem}</p>
              <p className="text-sm text-gray-800 mt-1">💡 {idea.solution}</p>
              <p className="text-xs text-gray-400 mt-2">
                Score: {idea.score} |{" "}
                {new Date(idea.created_at).toLocaleDateString()}
              </p>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
