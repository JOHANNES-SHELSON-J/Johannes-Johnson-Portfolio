"use client";

import Link from "next/link";
import { useState } from "react";

const LINKEDIN_URL = "https://linkedin.com/in/johannes-johnson-882636257/";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const email = "johannes.shelson12@gmail.com"; // Email Address

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback: do nothing
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16">
        {/* Top nav back */}
        <Link
          href="/"
          className="text-sm text-blue-300 hover:text-blue-200 transition"
        >
          ← Back to Command Center
        </Link>

        {/* Header */}
        <div className="mt-6">
          <h1 className="text-3xl sm:text-4xl font-bold">Contact Console</h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Fast ways to reach me. Recruiters: LinkedIn is the quickest channel.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* LinkedIn */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl p-6 bg-white/5 border border-white/10
                       hover:bg-white/10 hover:border-blue-400/40
                       hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.45)]
                       transition"
          >
            <div className="text-sm text-gray-400">Primary</div>
            <div className="mt-2 text-lg font-semibold">LinkedIn</div>
            <p className="text-gray-400 mt-2 text-sm">
              View profile, experience, and projects.
            </p>
            <div className="mt-5 text-sm text-blue-300">Open LinkedIn →</div>
          </a>

          {/* Email */}
          <div
            className="rounded-2xl p-6 bg-white/5 border border-white/10
                       hover:bg-white/10 hover:border-blue-400/40 transition"
          >
            <div className="text-sm text-gray-400">Direct</div>
            <div className="mt-2 text-lg font-semibold">Email</div>
            <p className="text-gray-400 mt-2 text-sm break-all">{email}</p>

            <button
              onClick={copyEmail}
              className="mt-5 rounded-xl px-4 py-2 text-sm bg-blue-500 text-black font-semibold
                         hover:bg-blue-400 transition"
              type="button"
            >
              {copied ? "Copied!" : "Copy Email"}
            </button>
          </div>

          {/* GitHub (placeholder) */}
          <div
            className="rounded-2xl p-6 bg-white/5 border border-white/10
                       opacity-80"
          >
            <div className="text-sm text-gray-400">Code</div>
            <div className="mt-2 text-lg font-semibold">GitHub</div>
            <p className="text-gray-400 mt-2 text-sm">
              We’ll add this after you push the code to GitHub.
            </p>
            <div className="mt-5 text-sm text-gray-500">Coming soon</div>
          </div>
        </div>

        {/* Resume */}
        <div className="mt-8 rounded-2xl p-6 bg-white/5 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">Resume</div>
              <p className="text-gray-400 mt-1 text-sm">
                We’ll add a downloadable PDF button here once you upload it into
                the project.
              </p>
            </div>

            <button
              className="rounded-xl px-5 py-3 border border-white/15 text-white
                         hover:border-blue-400 hover:text-blue-300 transition"
              type="button"
            >
              Download Resume (soon)
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}