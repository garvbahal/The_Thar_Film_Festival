import { useState, useEffect } from "react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios.jsx";
import toast from "react-hot-toast";

export default function ParticipantDashboardPage() {
    const navigate = useNavigate();

    const [team, setTeam] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const [youtubeLink, setYoutubeLink] = useState("");
    const [driveLink, setDriveLink] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamRes = await api.get("/team");
                const notifRes = await api.get("/getnotifications");

                setTeam(teamRes.data.team);
                setNotifications(notifRes.data.notifications || []);
            } catch (err) {
                console.error(err);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (!youtubeLink && !driveLink) {
            toast.error("Provide at least one link");
            return;
        }
        const toastId = toast.loading("Saving submission...");
        setSubmitting(true);
        try {
            await api.post("/submit", {
                youtubeLink,
                driveLink,
            });
            toast.success("submission saved successfully", { id: toastId });
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to save submission",
                { id: toastId }
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return null;

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <div className="text-xs font-semibold tracking-widest text-zinc-400">
                        PARTICIPANT DASHBOARD
                    </div>
                    <h1 className="mt-2 text-3xl font-black tracking-wider text-white">
                        Welcome, {team.teamName}
                    </h1>
                    <p className="mt-2 text-sm text-zinc-300">
                        View your team details, upload submission links, and
                        track admin notifications.
                    </p>
                </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <Card title="TEAM DETAILS" className="lg:col-span-1">
                    <div className="text-sm text-zinc-200">
                        <div className="text-xs text-zinc-400">Team Name</div>
                        <div className="mt-1 text-lg font-extrabold text-white">
                            {team.teamName}
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="text-xs font-semibold tracking-widest text-zinc-400">
                            MEMBERS
                        </div>
                        <ul className="mt-2 space-y-2">
                            {team.members.map((m) => (
                                <li
                                    key={m}
                                    className="rounded-xl border border-white/10 bg-festival-panel px-3 py-2 text-sm text-zinc-200"
                                >
                                    {m.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>

                <Card title="UPLOAD SUBMISSIONS" className="lg:col-span-2">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Input
                            label="YouTube Video Link"
                            value={youtubeLink}
                            onChange={(e) => setYoutubeLink(e.target.value)}
                            placeholder="https://youtube.com/..."
                        />
                        <Input
                            label="Google Drive Link"
                            value={driveLink}
                            onChange={(e) => setDriveLink(e.target.value)}
                            placeholder="https://drive.google.com/..."
                        />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? "Saving..." : "Save Links"}
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                setYoutubeLink("");
                                setDriveLink("");
                            }}
                        >
                            Clear
                        </Button>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-festival-panel p-4 text-sm text-zinc-300">
                        <div className="text-xs font-semibold tracking-widest text-zinc-400">
                            TIP
                        </div>
                        <div className="mt-1">
                            Provide at least one link. Make sure permissions are
                            set to
                            <span className="font-semibold text-zinc-200">
                                {" "}
                                public/view
                            </span>
                            .
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-6">
                <Card title="NOTIFICATIONS">
                    <div className="grid gap-4 md:grid-cols-2">
                        {notifications.map((n) => (
                            <article
                                key={n.id}
                                className="rounded-2xl border border-white/10 bg-festival-panel p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="text-sm font-extrabold text-white">
                                        {n.title}
                                    </div>
                                    <div className="text-xs text-zinc-500">
                                        {new Date(n.sendAt).toLocaleString()}
                                    </div>
                                </div>
                                <div className="mt-2 text-sm leading-6 text-zinc-300">
                                    {n.message}
                                </div>
                            </article>
                        ))}
                    </div>
                </Card>
            </div>
        </main>
    );
}
