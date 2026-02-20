import Link from "next/link";
import { projects } from "../../lib/projects";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-gray-200">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white">
        <section className="mx-auto max-w-6xl px-6 pt-14 pb-16">
          <h1 className="text-3xl font-bold">Project not found</h1>
          <p className="text-gray-400 mt-2">Check the URL and try again.</p>
          <Link
            href="/projects"
            className="inline-block mt-6 text-blue-300 hover:text-blue-200 transition"
          >
            ← Back to Projects
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/projects"
            className="text-sm text-blue-300 hover:text-blue-200 transition"
          >
            ← Back to Projects
          </Link>

          <div className="text-xs text-gray-500">
            Case Study • {project.slug}
          </div>
        </div>

        {/* Header */}
        <div className="mt-6">
          <h1 className="text-3xl sm:text-4xl font-bold">{project.title}</h1>
          <p className="text-gray-400 mt-2 max-w-3xl">{project.subtitle}</p>

          <div className="flex flex-wrap gap-2 mt-5">
            {project.stack.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>

        {/* Summary Panel */}
        <div className="mt-8 rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-sm text-gray-400">Project Summary</div>
              <div className="mt-2 text-gray-200">
                Problem → pipeline → measurable results.
              </div>
            </div>

            {project.links?.length ? (
              <div className="flex flex-wrap gap-2">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl px-4 py-2 text-sm border border-white/15
                               hover:border-blue-400 hover:text-blue-300 transition"
                  >
                    {l.label} →
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl p-6 bg-white/5 border border-white/10
                         hover:bg-white/10 hover:border-blue-400/40
                         hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.45)]
                         transition"
            >
              <div className="text-2xl font-bold">{m.value}</div>
              <div className="text-gray-400 mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Pipeline (unique DS touch) */}
        <div className="mt-8 rounded-2xl p-6 bg-white/5 border border-white/10">
          <SectionTitle>Pipeline</SectionTitle>
          <p className="text-gray-400 mt-2 text-sm">
            How this project flows from raw input to delivered output.
          </p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Data In", desc: "Sources, tables, files" },
              { title: "Clean", desc: "Prep, normalize, validate" },
              { title: "Compute", desc: "Queries, ML, logic" },
              { title: "Deliver", desc: "Dashboard / app / insights" },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl p-5 bg-black/30 border border-white/10"
              >
                <div className="text-sm text-gray-400">Stage</div>
                <div className="mt-1 font-semibold">{step.title}</div>
                <div className="text-gray-400 text-sm mt-2">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <SectionTitle>Problem</SectionTitle>
            <p className="text-gray-300 mt-3 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
            <SectionTitle>Results</SectionTitle>
            <ul className="mt-3 space-y-2 text-gray-300">
              {project.results.map((r) => (
                <li key={r}>• {r}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl p-6 bg-white/5 border border-white/10 mt-6">
          <SectionTitle>Approach</SectionTitle>
          <ol className="mt-3 space-y-2 text-gray-300 list-decimal list-inside">
            {project.approach.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
