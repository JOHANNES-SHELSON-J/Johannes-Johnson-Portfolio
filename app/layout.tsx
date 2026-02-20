import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Johannes Johnson",
  description: "Data Command Center Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* Global Navbar */}
        <nav className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-wide hover:text-blue-400 transition"
            >
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

        {children}x
      </body>
    </html>
  );
}