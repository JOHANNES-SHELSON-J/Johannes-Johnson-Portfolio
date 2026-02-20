import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          Home Page
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm text-gray-300">
            <Link href="/experience" className="hover:text-blue-400 transition">
            Experience
          </Link>
          <Link href="/projects" className="hover:text-blue-400 transition">
            Projects
          </Link>
          <Link href="/skills" className="hover:text-blue-400 transition">
            Skills
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
