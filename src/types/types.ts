export type Source = {
  pain_id: number;
  subreddit: string | null;
  url: string | null;
};
export type IdeaRow = {
  idea_id: number;
  summary: string;
  problem: string;
  personas: string; // JSON string or plain
  solution: string;
  gtm: string; // JSON string or plain
  risks: string; // JSON string or plain
  monetization: string;
  kpis: string; // JSON string or plain
  score: number;
  created_at: number; // unix seconds
  sources: Source[] | null;
};
