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
        </main>
    );
}
