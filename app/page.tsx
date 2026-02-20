import Link from "next/link";
import { projects } from "./lib/projects";
import HeroPhoto from "./components/HeroPhoto";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-gray-200">
      {children}
    </span>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ExperienceItem({
  role,
  org,
  location,
  dates,
  bullets,
}: {
  role: string;
  org: string;
  location: string;
  dates: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl p-5 bg-black/30 border border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <div className="font-semibold text-white">{role}</div>
          <div className="text-sm text-gray-300 mt-0.5">
            {org} • {location}
          </div>
        </div>
        <div className="text-sm text-gray-400">{dates}</div>
      </div>

      <ul className="mt-3 space-y-2 text-sm text-gray-300 list-disc pl-5">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function DownloadResumeButton() {
  return (
    <a
      href="/resume/johannes-johnson-data-analyst.pdf"
      download
      className="inline-flex items-center gap-2 rounded-xl px-5 py-3
                 bg-blue-500 text-black font-semibold hover:bg-blue-400 transition"
      aria-label="Download Resume"
    >
      Download Resume
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M12 16l4-5h-3V4h-2v7H8l4 5z" />
        <path d="M4 18h16v2H4z" />
      </svg>
    </a>
  );
}

export default function Home() {
  const featured = projects.slice(0, 3);

  const experiencePreview = [
    {
      role: "Graduate Teaching Assistant",
      org: "University of Houston–Clear Lake",
      location: "Houston, TX",
      dates: "Jan 2026 – May 2026",
      bullets: [
        "Supported 60+ students by clarifying requirements and evaluation criteria for analytical coursework.",
        "Reviewed 100+ submissions and applied structured feedback, improving reporting clarity by ~20%.",
        "Facilitated communication between faculty and students to align expectations and resolve gaps.",
      ],
    },
    {
      role: "Student Assistant, Circulation Desk",
      org: "UHCL Neumann Library",
      location: "Houston, TX",
      dates: "Oct 2024 – Dec 2025",
      bullets: [
        "Managed 200+ daily service transactions and assisted 100+ patrons weekly with service requests.",
        "Identified workflow inefficiencies and supported process improvements that reduced wait time by ~15%.",
        "Contributed to campus initiatives that helped improve student engagement by ~20%.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl bg-blue-600/40" />
        <div className="absolute bottom-[-220px] right-[-160px] h-[520px] w-[520px] rounded-full blur-3xl bg-cyan-500/20" />
      </div>

      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16">
        {/* HERO + PHOTO ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {/* <span className="h-2 w-2 rounded-full bg-green-400" />
              <span>Command Center</span>
              <span className="text-gray-600">•</span>
              <span>Data / ML / Dashboards</span> */}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              Johannes Johnson
            </h1>

            <p className="text-gray-300 max-w-2xl">
              A dashboard view of my work: projects, measurable impact, and the
              tools I use to build data-driven solutions.
            </p>

            {/* Primary buttons */}
            <div className="mt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/projects"
                className="rounded-xl px-5 py-3 bg-blue-500 text-black font-semibold hover:bg-blue-400 transition"
              >
                Open Projects →
              </Link>

              <Link
                href="/experience"
                className="rounded-xl px-5 py-3 border border-white/15 text-white hover:border-blue-400 hover:text-blue-300 transition"
              >
                Experience
              </Link>

              <Link
                href="/contact"
                className="rounded-xl px-5 py-3 border border-white/15 text-white hover:border-blue-400 hover:text-blue-300 transition"
              >
                Contact
              </Link>
            </div>

            {/* ✅ Single Download Resume button with icon */}
            <div className="mt-4">
              <div className="text-xs text-gray-400 mb-2">Resume</div>
              <DownloadResumeButton />
              <div className="mt-2 text-xs text-gray-500">
              </div>
            </div>
          </div>

          {/* Right (Photo) */}
          <div className="flex justify-start lg:justify-end">
            <HeroPhoto />
          </div>
        </div>

        {/* Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card title="Status">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="font-semibold">Open to opportunities</span>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Data Analyst / Data Science / BI roles
            </p>
          </Card>

          <Card title="Focus">
            <div className="flex flex-wrap gap-2">
              <Pill>SQL Analytics</Pill>
              <Pill>Dashboards</Pill>
              <Pill>ML Basics</Pill>
              <Pill>Data Modeling</Pill>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              Turning raw data into decisions and products.
            </p>
          </Card>

          <Card title="Stack">
            <div className="flex flex-wrap gap-2">
              <Pill>Python</Pill>
              <Pill>PostgreSQL</Pill>
              <Pill>Power BI</Pill>
              <Pill>Pandas</Pill>
              <Pill>Scikit-learn</Pill>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              Clean pipelines • analysis • reporting
            </p>
          </Card>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { v: "50K+", l: "Records Processed" },
            { v: "5+", l: "Projects Built" },
            { v: "10+", l: "Tools & Technologies" },
          ].map((k) => (
            <div
              key={k.l}
              className="rounded-2xl p-6 bg-white/5 border border-white/10
                         hover:bg-white/10 hover:border-blue-400/40
                         hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.55)]
                         transition"
            >
              <div className="text-3xl font-bold">{k.v}</div>
              <div className="mt-2 text-gray-400">{k.l}</div>
            </div>
          ))}
        </div>

        {/* Experience Preview */}
        <div className="mt-10 rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Experience Snapshot</h2>
              <p className="text-gray-400 text-sm mt-1">
                A quick view of roles where I built real impact through analysis,
                structured reporting, and stakeholder collaboration.
              </p>
            </div>

            <Link
              href="/experience"
              className="text-sm text-blue-300 hover:text-blue-200 transition"
            >
              View experience →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {experiencePreview.map((e) => (
              <ExperienceItem
                key={e.role}
                role={e.role}
                org={e.org}
                location={e.location}
                dates={e.dates}
                bullets={e.bullets}
              />
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href="/experience"
              className="rounded-xl px-5 py-3 bg-blue-500 text-black font-semibold hover:bg-blue-400 transition"
            >
              Explore full experience →
            </Link>
          </div>
        </div>

        {/* Recent Work */}
        <div className="mt-10 rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold">Recent Work</h2>
              <p className="text-gray-400 text-sm mt-1">
                Quick access to the most relevant case studies.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-sm text-blue-300 hover:text-blue-200 transition"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="rounded-2xl p-5 bg-black/30 border border-white/10
                           hover:bg-white/10 hover:border-blue-400/40
                           hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.45)]
                           transition"
              >
                <div className="font-semibold">{p.title}</div>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {p.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {p.stack.slice(0, 4).map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>

                <div className="mt-4 text-sm text-blue-300">
                  Open case study →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}