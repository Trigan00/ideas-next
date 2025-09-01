"use client";

import Section from "@/componets/UI/Section";
import KeyList from "@/componets/UI/KeyList";
import SkeletonCard from "@/componets/UI/SkeletonCard";
import fixUrl from "@/helpers/fixUrl";
import formatDate from "@/helpers/formateDate";
import safeJSON from "@/helpers/safeJSON";
import shortenUrl from "@/helpers/shortenUrl";
import { IdeaRow } from "@/types/types";
import { ArrowLeft, Clock4, ExternalLink, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Details({ idea }: { idea: IdeaRow }) {
  const router = useRouter();

  const personas = idea ? safeJSON<string[] | string>(idea.personas, []) : [];
  const kpis = idea ? safeJSON<string[] | string>(idea.kpis, []) : [];
  const risks = idea ? safeJSON<string[] | string>(idea.risks, []) : [];
  const gtm = idea ? safeJSON<string[] | string>(idea.gtm, []) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <button
          onClick={() => router.push(`/ideas`)}
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {/* {isLoading && (
          <div className="mt-6">
            <SkeletonCard />
          </div>
        )} */}
        {idea && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/50">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-semibold">{idea.summary}</h2>
                <div className="flex items-center gap-2 text-amber-500">
                  <Star className="h-5 w-5" />
                  <span className="font-medium">{idea.score.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Clock4 className="h-4 w-4" /> {formatDate(idea.created_at)}
              </div>
              <p className="mt-4 text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                {idea.problem}
              </p>
            </div>

            <Section title="Solution" body={idea.solution} />
            <Section
              title="Go-To-Market"
              body={Array.isArray(gtm) ? gtm.join("\n") : String(gtm)}
            />
            {/* <KeyList
              title="Personas"
              items={Array.isArray(personas) ? personas : [String(personas)]}
            /> */}
            <KeyList
              title="KPIs"
              items={Array.isArray(kpis) ? kpis : [String(kpis)]}
            />
            <KeyList
              title="Risks"
              items={Array.isArray(risks) ? risks : [String(risks)]}
            />
            <Section title="Monetization" body={idea.monetization} />

            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold">Sources</h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(idea.sources || []).map((s, idx) => (
                  <a
                    key={`${s.pain_id}-${idx}`}
                    href={fixUrl(s.url || "#")}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-start gap-2 rounded-xl border border-gray-200 dark:border-gray-800 p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <ExternalLink className="h-4 w-4 mt-1 shrink-0" />
                    <div>
                      <div className="text-sm font-medium">
                        {shortenUrl(s.url || "")}
                      </div>
                      <div className="text-xs text-gray-500">
                        r/{s.subreddit}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
