import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

export default function HomePage() {
    return (
        <main>
            <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
                <div className="pointer-events-none absolute inset-0 opacity-70">
                    <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-festival-accent/10 blur-3xl" />
                    <div className="absolute bottom-[-260px] right-[-120px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_10%,rgba(246,201,14,0.12),rgba(10,10,10,0)_70%)]" />
                </div>

                <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:py-20">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
                            <span className="h-2 w-2 rounded-full bg-festival-accent" />
                            Intercollege Short Film Competition
                        </div>

                        <h1 className="mt-4 text-4xl font-black tracking-[0.18em] text-white md:text-6xl">
                            THAR
                            <span className="block text-festival-accent">
                                FILM FESTIVAL
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-300 md:text-base">
                            A cinematic, intercollege platform to showcase
                            storytelling. Register your team, submit your short
                            film, and get featured in a festival-worthy
                            showcase.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Button
                                as="a"
                                href="/brochure.pdf"
                                download
                                variant="secondary"
                            >
                                Download Brochure
                            </Button>
                            <Button as={Link} to="/signup">
                                Register Now
                            </Button>
                        </div>

                        <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 text-xs text-zinc-400 md:grid-cols-4">
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="text-festival-accent font-extrabold">
                                    Teams
                                </div>
                                <div className="mt-1">1-6 members</div>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="text-festival-accent font-extrabold">
                                    Genre
                                </div>
                                <div className="mt-1">Open theme</div>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="text-festival-accent font-extrabold">
                                    Format
                                </div>
                                <div className="mt-1">YouTube / Drive</div>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="text-festival-accent font-extrabold">
                                    Awards
                                </div>
                                <div className="mt-1">Festival honors</div>
                            </div>
                        </div>
                    </div>

                    <div className="md:justify-self-end">
                        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 shadow-glow">
                            <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,rgba(246,201,14,0.12),rgba(255,255,255,0)_40%)]" />
                            <div className="relative">
                                <div className="text-xs font-semibold tracking-widest text-zinc-400">
                                    FESTIVAL HIGHLIGHTS
                                </div>
                                <div className="mt-3 space-y-3">
                                    {[
                                        {
                                            k: "Submission Window",
                                            v: "Open (UI demo)",
                                        },
                                        {
                                            k: "Eligibility",
                                            v: "Intercollege participants",
                                        },
                                        {
                                            k: "Deliverables",
                                            v: "Film + team details",
                                        },
                                        {
                                            k: "Updates",
                                            v: "Admin notifications",
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.k}
                                            className="flex items-center justify-between rounded-2xl border border-white/10 bg-festival-panel px-4 py-3"
                                        >
                                            <div className="text-sm font-semibold text-zinc-200">
                                                {item.k}
                                            </div>
                                            <div className="text-sm text-zinc-400">
                                                {item.v}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 rounded-2xl border border-festival-accent/25 bg-black/30 p-4">
                                    <div className="text-sm font-extrabold text-festival-accent">
                                        Pro Tip
                                    </div>
                                    <div className="mt-1 text-sm text-zinc-300">
                                        Keep your film link ready (YouTube
                                        unlisted or Drive) before submitting.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10 bg-black py-24">
                <div className="mx-auto max-w-6xl px-4">
                    <h2 className="text-center text-3xl font-black tracking-widest text-festival-accent md:text-4xl">
                        HOW IT WORKS
                    </h2>
                    <p className="mt-4 text-center text-zinc-400">
                        From registration to festival screening
                    </p>

                    <div className="mt-16 grid gap-8 md:grid-cols-4">
                        {[
                            {
                                step: "01",
                                title: "Register Team",
                                desc: "Create your team and add members",
                            },
                            {
                                step: "02",
                                title: "Create Film",
                                desc: "Shoot a short film based on any theme",
                            },
                            {
                                step: "03",
                                title: "Submit Entry",
                                desc: "Upload your film link & details",
                            },
                            {
                                step: "04",
                                title: "Get Featured",
                                desc: "Top films showcased at festival",
                            },
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="relative rounded-2xl border border-white/10 bg-festival-panel p-6"
                            >
                                <div className="text-5xl font-black text-white/5">
                                    {item.step}
                                </div>
                                <div className="relative z-10">
                                    <h3 className="mt-2 text-lg font-extrabold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-zinc-400">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-24">
                <div className="mx-auto max-w-6xl px-4">
                    <h2 className="text-center text-3xl font-black tracking-widest text-white md:text-4xl">
                        WHY PARTICIPATE?
                    </h2>

                    <div className="mt-16 grid gap-6 md:grid-cols-3">
                        {[
                            {
                                title: "Festival Recognition",
                                desc: "Get your work showcased in a curated film festival",
                            },
                            {
                                title: "Creative Freedom",
                                desc: "No theme restrictions. Tell the story you believe in",
                            },
                            {
                                title: "Build Your Film Profile",
                                desc: "Perfect for portfolios, resumes & future opportunities",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-festival-accent/40 transition"
                            >
                                <h3 className="text-lg font-extrabold text-festival-accent">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm text-zinc-400">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="border-t border-white/10 bg-black py-24">
                <div className="mx-auto max-w-5xl px-4">
                    <h2 className="text-center text-3xl font-black tracking-widest text-festival-accent">
                        SUBMISSION GUIDELINES
                    </h2>

                    <ul className="mt-12 space-y-4 text-zinc-300">
                        {[
                            "Film duration should be within allowed limits",
                            "YouTube (Unlisted) or Google Drive links only",
                            "One submission per team",
                            "Content must be original",
                        ].map((rule, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-3 rounded-xl border border-white/10 bg-festival-panel px-4 py-3"
                            >
                                <span className="mt-1 h-2 w-2 rounded-full bg-festival-accent" />
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="py-24">
                <div className="mx-auto max-w-6xl px-4">
                    <h2 className="text-center text-3xl font-black tracking-widest text-white">
                        JUDGING CRITERIA
                    </h2>

                    <div className="mt-16 grid gap-6 md:grid-cols-4">
                        {[
                            "Storytelling",
                            "Direction",
                            "Cinematography",
                            "Overall Impact",
                        ].map((c) => (
                            <div
                                key={c}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
                            >
                                <div className="text-lg font-extrabold text-festival-accent">
                                    {c}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="relative border-t border-white/10 bg-black py-28">
                <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_50%_50%,rgba(246,201,14,0.15),rgba(0,0,0,0)_70%)]" />

                <div className="relative mx-auto max-w-3xl px-4 text-center">
                    <h2 className="text-4xl font-black tracking-widest text-white">
                        READY TO COMPETE?
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        Register now and showcase your cinematic vision
                    </p>

                    <div className="mt-8">
                        <Button as={Link} to="/signup">
                            Join the Festival
                        </Button>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/10 bg-black">
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <div className="grid gap-10 md:grid-cols-3">
                        {/* Brand */}
                        <div>
                            <div className="text-xl font-black tracking-widest text-white">
                                THAR
                                <span className="block text-festival-accent">
                                    FILM FESTIVAL
                                </span>
                            </div>
                            <p className="mt-4 text-sm text-zinc-400 max-w-xs">
                                An intercollege short film festival celebrating
                                storytelling and creative vision.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <div className="text-sm font-extrabold tracking-widest text-white">
                                QUICK LINKS
                            </div>
                            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                                <li>
                                    <Link
                                        to="/signup"
                                        className="hover:text-white"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="hover:text-white"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/rules"
                                        className="hover:text-white"
                                    >
                                        Rules
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin"
                                        className="hover:text-white"
                                    >
                                        Admin
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <div className="text-sm font-extrabold tracking-widest text-white">
                                CONTACT
                            </div>
                            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                                <li>Email: tharfilmfest@gmail.com</li>
                                <li>Instagram: @tharfilmfest</li>
                                <li>Location: India</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-zinc-500">
                        © {new Date().getFullYear()} Thar Film Festival. All
                        rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}
