"use client";

import { useMemo, useState } from "react";

type Group = {
  title: string;
  subtitle: string;
  skills: string[];
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-gray-200 hover:border-blue-400 transition">
      {children}
    </span>
  );
}

export default function SkillsPage() {
  const [query, setQuery] = useState("");

  const groups: Group[] = [
    {
      title: "Programming & Frontend",
      subtitle: "Languages and UI technologies",
      skills: [
        "Python",
        "SQL",
        "R",
        "HTML",
        "CSS",
        "Bootstrap",
        "Tailwind CSS",
      ],
    },
    {
      title: "Data Analysis",
      subtitle: "Cleaning, EDA, modeling foundations",
      skills: [
        "Pandas",
        "NumPy",
        "SciPy",
        "Scikit-learn",
        "EDA",
        "Data Cleaning",
        "Statistical Analysis",
        "Matplotlib",
        "Seaborn",
      ],
    },
    {
      title: "Visualization & BI",
      subtitle: "Dashboards and reporting tools",
      skills: [
        "Power BI",
        "Tableau",
        "Excel",
        "Power Query",
        "DAX",
      ],
    },
    {
      title: "Databases & Big Data",
      subtitle: "Storage and distributed systems",
      skills: [
        "PostgreSQL",
        "MySQL",
        "Snowflake",
        "Apache Spark (PySpark)",
        "Hadoop (HDFS / MapReduce)",
      ],
    },
    {
      title: "Cloud",
      subtitle: "Cloud data services",
      skills: [
        "AWS S3",
        "AWS EC2",
      ],
    },
    {
      title: "Concepts",
      subtitle: "Architectural and data engineering concepts",
      skills: [
        "ETL Pipelines",
        "Data Modeling (Star Schema)",
        "Data Warehousing",
        "Batch Processing",
      ],
    },
    {
      title: "Tools",
      subtitle: "Daily workflow tools",
      skills: [
        "Git",
        "Jupyter Notebook",
        "VS Code",
        "Google Colab",
      ],
    },
    {
      title: "Project Management",
      subtitle: "Collaboration and delivery systems",
      skills: [
        "Jira",
        "Confluence",
        "Agile / Scrum",
      ],
    },
    {
      title: "Soft Skills",
      subtitle: "Professional strengths",
      skills: [
        "Analytical Thinking",
        "Problem Solving",
        "Stakeholder Communication",
        "Team Collaboration",
      ],
    },
  ];

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;

    return groups
      .map((g) => ({
        ...g,
        skills: g.skills.filter((s) =>
          s.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.skills.length > 0);
  }, [query]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Skills Command Board
            </h1>
            <p className="text-gray-400 mt-2">
              Organized view of my technical stack and professional strengths.
            </p>
          </div>

          <div className="w-full md:w-80">
            <div className="text-xs text-gray-400 mb-2">
              Search skills
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type: SQL, Power BI, Spark..."
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {filteredGroups.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-blue-400/40 transition"
            >
              <h2 className="text-lg font-semibold">{g.title}</h2>
              <p className="text-gray-400 text-sm mt-1">{g.subtitle}</p>

              <div className="flex flex-wrap gap-2 mt-5">
                {g.skills.map((skill) => (
                  <Pill key={skill}>{skill}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="mt-10 text-gray-400">
            No skills found for "{query}".
          </div>
        )}
      </section>
    </main>
  );
}