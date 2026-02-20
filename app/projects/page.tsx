"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects } from "../lib/projects";

type Project = {
  slug: string;
  title: string;
  subtitle?: string; // short summary for card
  description?: string; // longer summary
  stack: string[]; // tags
  impact?: string; // "50K+ records", "12K+ txns", etc.
  year?: number;
  type?: string; // "Dashboard", "ML", "Web App", "Data Engineering"
  repo?: string; // optional later
  live?: string; // optional later
  highlights?: string[]; // optional bullets
};

function Pill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={[
        "text-xs px-3 py-1 rounded-full border transition",
        active
          ? "bg-blue-500/15 border-blue-400/40 text-blue-200"
          : "bg-black/40 border-white/10 text-gray-200 hover:border-blue-400/30",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function parseImpactNumber(impact?: string) {
  // Converts "50K+", "12,000+", "100+" into a rough numeric value for sorting
  if (!impact) return 0;
  const s = impact.toUpperCase().replace(/,/g, "").trim(); // "50K+"
  const kMatch = s.match(/(\d+(\.\d+)?)\s*K/);
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000);
  const mMatch = s.match(/(\d+(\.\d+)?)\s*M/);
  if (mMatch) return Math.round(parseFloat(mMatch[1]) * 1000000);

  const numMatch = s.match(/(\d+(\.\d+)?)/);
  if (numMatch) return Math.round(parseFloat(numMatch[1]));
  return 0;
}

export default function ProjectsPage() {
  const allProjects = projects as unknown as Project[];

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");
  const [sort, setSort] = useState<"impact" | "newest" | "az">("impact");

  // Build filter list from all stacks
  const tags = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((p) => p.stack?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [allProjects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = [...allProjects];

    // Tag filter
    if (activeTag !== "All") {
      list = list.filter((p) => p.stack?.includes(activeTag));
    }

    // Search filter
    if (q.length > 0) {
      list = list.filter((p) => {
        const hay = [
          p.title,
          p.subtitle,
          p.description,
          p.impact,
          p.type,
          p.year ? String(p.year) : "",
          ...(p.stack || []),
          ...(p.highlights || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return hay.includes(q);
      });
    }

    // Sort
    if (sort === "impact") {
      list.sort((a, b) => parseImpactNumber(b.impact) - parseImpactNumber(a.impact));
    } else if (sort === "newest") {
      list.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [allProjects, activeTag, query, sort]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background glow (light) */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-48 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-3xl bg-blue-600/35" />
        <div className="absolute top-[380px] right-[-160px] h-[520px] w-[520px] rounded-full blur-3xl bg-cyan-500/15" />
      </div>

      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span>Project Command Board</span>
            <span className="text-gray-600">•</span>
            <span>Explore pipelines, dashboards, and ML workflows</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            Projects
          </h1>
        </div>

        {/* Controls Row */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search: "SQL", "Power BI", "50K", "routing", "ETL"...'
                  className="w-full bg-transparent outline-none text-sm text-gray-200 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 mr-1">Sort:</span>

              <button
                onClick={() => setSort("impact")}
                className={[
                  "text-sm px-3 py-2 rounded-xl border transition",
                  sort === "impact"
                    ? "bg-blue-500/15 border-blue-400/40 text-blue-200"
                    : "bg-white/5 border-white/10 text-gray-200 hover:border-blue-400/30",
                ].join(" ")}
              >
                Impact
              </button>

              <button
                onClick={() => setSort("newest")}
                className={[
                  "text-sm px-3 py-2 rounded-xl border transition",
                  sort === "newest"
                    ? "bg-blue-500/15 border-blue-400/40 text-blue-200"
                    : "bg-white/5 border-white/10 text-gray-200 hover:border-blue-400/30",
                ].join(" ")}
              >
                Newest
              </button>

              <button
                onClick={() => setSort("az")}
                className={[
                  "text-sm px-3 py-2 rounded-xl border transition",
                  sort === "az"
                    ? "bg-blue-500/15 border-blue-400/40 text-blue-200"
                    : "bg-white/5 border-white/10 text-gray-200 hover:border-blue-400/30",
                ].join(" ")}
              >
                A–Z
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button key={t} onClick={() => setActiveTag(t)} className="text-left">
                <Pill active={activeTag === t}>{t}</Pill>
              </button>
            ))}
          </div>

          {/* Summary bar */}
          <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm text-gray-300">
              Showing <span className="text-blue-300 font-semibold">{filtered.length}</span>{" "}
              project{filtered.length === 1 ? "" : "s"}
              {activeTag !== "All" ? (
                <>
                  {" "}
                  tagged <span className="text-blue-300 font-semibold">{activeTag}</span>
                </>
              ) : null}
              {query.trim() ? (
                <>
                  {" "}
                  for search <span className="text-blue-300 font-semibold">“{query.trim()}”</span>
                </>
              ) : null}
            </div>

            <button
              onClick={() => {
                setQuery("");
                setActiveTag("All");
                setSort("impact");
              }}
              className="text-sm text-gray-400 hover:text-blue-300 transition"
              type="button"
            >
              Reset filters →
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.slug}
              className="rounded-2xl p-6 bg-white/5 border border-white/10
                         hover:bg-white/10 hover:border-blue-400/35
                         hover:shadow-[0_0_45px_-18px_rgba(59,130,246,0.55)]
                         transition"
            >
              {/* Top row: title + year/type */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                  {p.type || p.year ? (
                    <div className="text-xs text-gray-500 mt-1">
                      {p.type ? <span>{p.type}</span> : null}
                      {p.type && p.year ? <span className="mx-2">•</span> : null}
                      {p.year ? <span>{p.year}</span> : null}
                    </div>
                  ) : null}
                </div>

                {p.impact ? (
                  <div className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-200 whitespace-nowrap">
                    Impact: {p.impact}
                  </div>
                ) : null}
              </div>

              {/* Subtitle/Description */}
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                {p.subtitle || p.description || "Open the case study for details, approach, and results."}
              </p>

              {/* Highlights (optional) */}
              {p.highlights && p.highlights.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  {p.highlights.slice(0, 3).map((h, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-blue-400/70 shrink-0" />
                      <span className="text-gray-300">{h}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mt-4">
                {(p.stack || []).slice(0, 8).map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-sm text-blue-300 hover:text-blue-200 transition"
                >
                  Open case study →
                </Link>

                <div className="flex items-center gap-3">
                  {p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-gray-400 hover:text-blue-200 transition"
                    >
                      Repo
                    </a>
                  ) : null}

                  {p.live ? (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-gray-400 hover:text-blue-200 transition"
                    >
                      Live
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl p-8 bg-white/5 border border-white/10">
            <div className="text-lg font-semibold">No projects found</div>
            <p className="text-gray-400 mt-2">
              Try clearing filters or searching with different keywords like{" "}
              <span className="text-blue-300">SQL</span>,{" "}
              <span className="text-blue-300">Power BI</span>,{" "}
              <span className="text-blue-300">ETL</span>,{" "}
              <span className="text-blue-300">PostgreSQL</span>,{" "}
              <span className="text-blue-300">ML</span>.
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}