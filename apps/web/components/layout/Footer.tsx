import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg-primary pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        <div className="col-span-1 md:col-span-6">
          <Link
            href="/"
            className="font-heading text-text-main text-3xl tracking-[0.2em] block mb-6 hover:text-accent transition-colors duration-300 w-max"
          >
            THAR
          </Link>
          <p className="text-text-muted max-w-sm text-sm font-light leading-relaxed">
            The premier destination for emerging visionary filmmakers to
            showcase their unpolished masterpieces.
          </p>
        </div>

        <div className="col-span-1 md:col-span-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-6 block">
            Sitemap
          </span>
          <ul className="space-y-4">
            <li>
              <a
                href="/#about"
                className="text-sm text-text-main hover:text-accent transition-colors duration-300"
              >
                The Philosophy
              </a>
            </li>
            <li>
              <a
                href="/#process"
                className="text-sm text-text-main hover:text-accent transition-colors duration-300"
              >
                How to Participate
              </a>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="text-sm text-text-main hover:text-accent transition-colors duration-300"
              >
                Dashboard Login
              </Link>
            </li>
            <li>
              <Link
                href="/auth/signup"
                className="text-sm text-text-main hover:text-accent transition-colors duration-300"
              >
                Register Crew
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-6 block">
            Contact
          </span>
          <ul className="space-y-4">
            <li>
              <a
                href="mailto:tharfilmfestival@gmail.com"
                className="text-sm text-text-main hover:text-accent transition-colors duration-300"
              >
                tharfilmfestival@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono tracking-widest text-text-muted uppercase">
        <p>&copy; 2026 Thar Film Festival.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-accent transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
