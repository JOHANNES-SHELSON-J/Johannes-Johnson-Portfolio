import Link from "next/link";

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl sm:text-5xl font-bold">{title}</h1>
      {subtitle ? <p className="text-gray-400 mt-2">{subtitle}</p> : null}
    </div>
  );
}

function Card({
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
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <div className="text-lg font-semibold">{org}</div>
          <div className="text-gray-300 mt-1">{role}</div>
          <div className="text-sm text-gray-400 mt-1">{location}</div>
        </div>
        <div className="text-sm text-gray-400 sm:text-right">{dates}</div>
      </div>

      <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
        {bullets.map((b, i) => (
          <li key={i} className="leading-relaxed">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl bg-blue-600/40" />
        <div className="absolute bottom-[-220px] right-[-160px] h-[520px] w-[520px] rounded-full blur-3xl bg-cyan-500/20" />
      </div>

      <section className="mx-auto max-w-6xl px-6 pt-12 pb-20">
        {/* PROFESSIONAL EXPERIENCE */}
        <SectionTitle
          title="Experience"
          subtitle="Professional experience and leadership — focused on measurable impact and collaboration."
        />

        <div className="grid grid-cols-1 gap-6">
          <Card
            org="University of Houston–Clear Lake — Houston, TX"
            role="Graduate Teaching Assistant | Jan 2026 – May 2026"
            location="Houston, TX"
            dates="Jan 2026 – May 2026"
            bullets={[
              "Supported 60+ students in analytical coursework by clarifying business requirements and evaluation criteria.",
              "Reviewed 100+ submissions and implemented structured feedback frameworks, improving reporting clarity by ~20%.",
              "Facilitated communication between faculty and students to align expectations and resolve requirement gaps.",
            ]}
          />

          <Card
            org="University of Houston–Clear Lake (Neumann Library) — Houston, TX"
            role="Student Assistant, Circulation Desk | Oct 2024 – Dec 2025"
            location="Houston, TX"
            dates="Oct 2024 – Dec 2025"
            bullets={[
              "Managed 200+ daily service transactions while assisting 100+ patrons weekly in resolving service requests.",
              "Identified workflow inefficiencies and contributed to process adjustments that reduced wait time by ~15%.",
              "Supported campus initiatives contributing to a 20% increase in student engagement.",
            ]}
          />

          <Card
            org="University of Houston — Houston, TX"
            role="Data Science Intern | Apr 2025 – Jun 2025"
            location="Houston, TX"
            dates="Apr 2025 – Jun 2025"
            bullets={[
              "Analyzed 20,000+ records to identify performance trends and support data-driven decision-making.",
              "Collaborated with stakeholders to translate business objectives into analytical requirements.",
              "Improved data consistency by ~30% through validation and structured data governance practices.",
              "Delivered executive-ready visual reports summarizing insights and actionable recommendations.",
            ]}
          />

          <Card
            org="PwC India — Chennai, India"
            role="Technology Consulting Trainee (Business & Data) | Jan 2023 – Dec 2023"
            location="Chennai, India"
            dates="Jan 2023 – Dec 2023"
            bullets={[
              "Completed 12-month structured training in SDLC, Agile/Scrum, and business systems analysis methodologies.",
              "Developed SQL-based reports from 5,000+ row datasets to support simulated client decision-making.",
              "Solved 10+ consulting case scenarios involving process analysis, gap identification, and improvement recommendations.",
              "Participated in requirement elicitation and documentation aligned with stakeholder objectives.",
            ]}
          />
        </div>

        {/* VOLUNTEERING */}
        <div className="mt-14">
          <SectionTitle
            title="Volunteering"
            subtitle="Community outreach and leadership experience."
          />

          <div className="grid grid-cols-1 gap-6">
            <Card
              org="St. John's Church, New Perungalathur, Chennai, India"
              role="Outreach Duties and Volunteer | May 2021 – Apr 2023"
              location="Chennai, India"
              dates="05/2021 – 04/2023"
              bullets={[
                "Engaged community in outreach, boosting participation by 30% and enhancing volunteer execution.",
                "Coordinated with a volunteer team of 8–10 members to streamline event logistics and communication.",
              ]}
            />

            <Card
              org="LEO Club of Rajalakshmi Engineering College, Chennai, India"
              role="Volunteer | Dec 2020 – Nov 2023"
              location="Chennai, India"
              dates="12/2020 – 11/2023"
              bullets={[
                "Coordinated and participated in 12+ community outreach events, increasing student involvement by over 25%.",
                "Collaborated with 20+ volunteers to organize workshops, charity drives, and leadership initiatives.",
                "Played a key role in event planning and logistics, resulting in smoother execution and higher attendance.",
              ]}
            />
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="text-blue-300 hover:text-blue-200 transition"
            >
              Want to reach out? Go to Contact →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}