import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
const navLinkBase =
    "text-sm font-semibold tracking-wide text-zinc-200 hover:text-white transition-colors";

export default function Navbar() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        toast.success("Logout successfull");
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-festival-bg/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link to="/" className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-festival-card shadow-glow grid place-items-center">
                        <span className="text-festival-accent font-black">
                            TF
                        </span>
                    </div>
                    <div className="leading-tight">
                        <div className="text-sm font-extrabold tracking-widest">
                            THAR
                        </div>
                        <div className="text-xs text-zinc-400">
                            Film Festival
                        </div>
                    </div>
                </Link>

                <div className="flex items-center gap-2">
                    {loading ? null : user ? (
                        <>
                            {/* Logout */}
                            <button
                                className="rounded-lg border border-white/10 bg-festival-panel px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-festival-card"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                            {/* Dashboard */}
                            <button
                                className="rounded-lg bg-festival-accent px-3 py-2 text-sm font-extrabold text-black hover:brightness-110"
                                onClick={(e) => {
                                    if (user.role === "admin") {
                                        navigate("/admin");
                                    } else {
                                        navigate("/participant");
                                    }
                                }}
                            >
                                Dashboard
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-lg border border-white/10 bg-festival-panel px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-festival-card"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="rounded-lg bg-festival-accent px-3 py-2 text-sm font-extrabold text-black hover:brightness-110"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
