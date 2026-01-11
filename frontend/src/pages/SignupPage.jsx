import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";

export default function SignupPage() {
    const [form, setForm] = useState({
        name: "",
        college: "",
        email: "",
        password: "",
        teamName: "",
        teamCode: "",
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const canSendOtp = useMemo(() => {
        return (
            form.name &&
            form.college &&
            form.email &&
            form.password &&
            form.teamName
        );
    }, [form]);

    return (
        <main className="min-h-screen bg-festival-bg">
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <div className="text-xs font-semibold tracking-widest text-zinc-400">
                            SIGNUP
                        </div>
                        <h1 className="mt-2 text-3xl font-black tracking-wider text-white">
                            Create your team account
                        </h1>
                        <p className="mt-2 text-sm text-zinc-300">
                            OTP-based signup flow (UI only). Use Team Code only
                            if you&apos;re joining an existing team.
                        </p>
                    </div>
                    <Button as={Link} to="/login" variant="secondary">
                        Back to Login
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-festival-card p-6 shadow-glow">
                        <div className="text-sm font-extrabold tracking-widest text-festival-accent">
                            ACCOUNT DETAILS
                        </div>

                        <form
                            className="mt-5 space-y-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <Input
                                label="Name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm((s) => ({
                                        ...s,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Your full name"
                            />
                            <Input
                                label="College Name"
                                value={form.college}
                                onChange={(e) =>
                                    setForm((s) => ({
                                        ...s,
                                        college: e.target.value,
                                    }))
                                }
                                placeholder="College / University"
                            />
                            <Input
                                label="Email"
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm((s) => ({
                                        ...s,
                                        email: e.target.value,
                                    }))
                                }
                                placeholder="you@college.edu"
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm((s) => ({
                                        ...s,
                                        password: e.target.value,
                                    }))
                                }
                                placeholder="Create a strong password"
                            />

                            <div className="grid gap-4 md:grid-cols-2">
                                <Input
                                    label="Team Name"
                                    value={form.teamName}
                                    onChange={(e) =>
                                        setForm((s) => ({
                                            ...s,
                                            teamName: e.target.value,
                                        }))
                                    }
                                    placeholder="e.g., Desert Frames"
                                />
                                <Input
                                    label="Team Code (optional)"
                                    value={form.teamCode}
                                    onChange={(e) =>
                                        setForm((s) => ({
                                            ...s,
                                            teamCode: e.target.value,
                                        }))
                                    }
                                    hint="Use only to join an existing team"
                                    placeholder="e.g., TF-29AB"
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Button
                                    type="button"
                                    variant={otpSent ? "secondary" : "primary"}
                                    disabled={!canSendOtp}
                                    onClick={() => {
                                        if (!canSendOtp) return;
                                        setOtpSent(true);
                                    }}
                                    className={!canSendOtp ? "opacity-60" : ""}
                                >
                                    Send OTP
                                </Button>
                                <div className="text-xs text-zinc-500">
                                    OTP UI appears after clicking Send OTP.
                                </div>
                            </div>

                            {otpSent ? (
                                <div className="mt-2 rounded-2xl border border-festival-accent/20 bg-black/20 p-4">
                                    <div className="text-xs font-semibold tracking-widest text-zinc-400">
                                        OTP VERIFICATION
                                    </div>
                                    <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                                        <Input
                                            label="Enter OTP"
                                            value={otp}
                                            onChange={(e) =>
                                                setOtp(e.target.value)
                                            }
                                            placeholder="123456"
                                            className="tracking-[0.35em]"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                // UI only
                                            }}
                                            className="w-full md:w-auto"
                                        >
                                            Verify OTP & Create Account
                                        </Button>
                                    </div>
                                    <div className="mt-2 text-xs text-zinc-500">
                                        Assumes OTP will be verified via
                                        backend.
                                    </div>
                                </div>
                            ) : null}

                            <div className="pt-2 text-sm text-zinc-400">
                                Already registered?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-festival-accent"
                                >
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
                        <div className="text-sm font-extrabold tracking-widest text-festival-accent">
                            HOW IT WORKS
                        </div>
                        <div className="mt-5 space-y-3">
                            {[
                                {
                                    t: "Create Team",
                                    d: "Choose a unique team name; team members can join using a Team Code.",
                                },
                                {
                                    t: "Verify OTP",
                                    d: "Receive an OTP on your email and verify to activate your account.",
                                },
                                {
                                    t: "Upload Links",
                                    d: "Add YouTube and/or Google Drive links from your dashboard.",
                                },
                                {
                                    t: "Track Updates",
                                    d: "Admins post notifications that appear instantly on your dashboard.",
                                },
                            ].map((s) => (
                                <div
                                    key={s.t}
                                    className="rounded-2xl border border-white/10 bg-festival-panel p-4"
                                >
                                    <div className="text-sm font-extrabold text-white">
                                        {s.t}
                                    </div>
                                    <div className="mt-1 text-sm text-zinc-300">
                                        {s.d}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-2xl border border-white/10 bg-festival-card p-4">
                            <div className="text-xs font-semibold tracking-widest text-zinc-400">
                                NOTE
                            </div>
                            <div className="mt-2 text-sm text-zinc-300">
                                This project is frontend-only. Axios is
                                pre-configured in
                                <span className="font-semibold text-zinc-200">
                                    {" "}
                                    services/api.js
                                </span>{" "}
                                for real API integration.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
