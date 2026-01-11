import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { fetchUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }
        const toastId = toast.loading("Logging in...");
        try {
            console.log("Going backend");
            const loginResponse = await api.post("/login", { email, password });
            console.log("Exiting backend", loginResponse.data);

            // console.log("Calling custom function");
            // const dataMy = await axios.get("http://localhost:3000/api/v1/me");
            // console.log(dataMy);
            console.log("Fetching user");
            const freshUser = await fetchUser();
            console.log("User fetched", freshUser);
            // console.log(user);

            toast.dismiss(toastId);
            toast.success("Login Successfull");

            if (freshUser.role === "admin") {
                navigate("/admin");
            } else if (
                freshUser.role === "leader" ||
                freshUser.role === "member"
            ) {
                navigate("/participant");
            } else {
                navigate("/");
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(
                error.response?.data?.message || "Login failed. try again."
            );
        }
    };

    return (
        <main className="min-h-screen bg-festival-bg">
            <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 md:grid-cols-2">
                <div className="relative hidden overflow-hidden border-r border-white/10 md:block">
                    <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_20%,rgba(246,201,14,0.18),rgba(10,10,10,0)_60%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.35),rgba(10,10,10,0.95))]" />
                    <div className="relative p-10">
                        <div className="text-xs font-semibold tracking-widest text-zinc-400">
                            THAR FILM FESTIVAL
                        </div>
                        <h1 className="mt-4 text-4xl font-black tracking-widest text-white">
                            Welcome Back
                        </h1>
                        <p className="mt-3 max-w-md text-sm leading-6 text-zinc-300">
                            Login to access your team dashboard, upload your
                            submission links, and view festival notifications.
                        </p>

                        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                            <div className="text-sm font-extrabold text-festival-accent">
                                Cinematic UI
                            </div>
                            <div className="mt-1 text-sm text-zinc-300">
                                Dark theme, bold typography, and yellow accents
                                inspired by festival posters.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-festival-card p-6 shadow-glow">
                        <div className="text-xs font-semibold tracking-widest text-zinc-400">
                            LOGIN
                        </div>
                        <h2 className="mt-2 text-2xl font-black tracking-wider text-white">
                            Participant Portal
                        </h2>

                        <form
                            className="mt-6 space-y-4"
                            onSubmit={handleSubmit}
                        >
                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@college.edu"
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />

                            <Button className="w-full" type="submit">
                                Login
                            </Button>

                            <div className="text-center text-sm text-zinc-400">
                                Don&apos;t have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-festival-accent"
                                >
                                    Signup
                                </Link>
                            </div>

                            <div className="text-center text-xs text-zinc-500">
                                UI only — assumes backend APIs exist.
                            </div>
                        </form>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button
                                as={Link}
                                to="/participant"
                                variant="secondary"
                                className="w-full"
                            >
                                Demo Participant
                            </Button>
                            <Button
                                as={Link}
                                to="/admin"
                                variant="secondary"
                                className="w-full"
                            >
                                Demo Admin
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
