import { useMemo, useState } from "react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import { useEffect } from "react";
import api from "../utils/axios.jsx";
import toast from "react-hot-toast";

function Table({ columns, rows, renderRowActions }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-festival-panel">
                        <tr>
                            {columns.map((c) => (
                                <th
                                    key={c}
                                    className="px-4 py-3 text-xs font-extrabold tracking-widest text-zinc-300"
                                >
                                    {c}
                                </th>
                            ))}
                            {renderRowActions ? (
                                <th className="px-4 py-3 text-xs font-extrabold tracking-widest text-zinc-300">
                                    ACTIONS
                                </th>
                            ) : null}
                        </tr>
                    </thead>
                    <tbody className="bg-festival-card">
                        {rows.map((r) => (
                            <tr key={r.id} className="border-t border-white/10">
                                <td className="px-4 py-3 text-zinc-200">
                                    {r.name}
                                </td>
                                <td className="px-4 py-3 text-zinc-300">
                                    {r.email}
                                </td>
                                <td className="px-4 py-3 text-zinc-300">
                                    {r.college}
                                </td>
                                <td className="px-4 py-3 text-zinc-300">
                                    {r.teamName}
                                </td>
                                {renderRowActions ? (
                                    <td className="px-4 py-3">
                                        {renderRowActions(r)}
                                    </td>
                                ) : null}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function AdminDashboardPage() {
    const [participants, setParticipants] = useState([]);
    const [notifText, setNotifText] = useState("");
    const [notifTitle, setNotifTitle] = useState("");
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const teamRes = await api.get("/admin/teams");
                const subsRes = await api.get("/admin/submissions");

                const rows = teamRes.data.teams.flatMap((team) =>
                    team.members.map((m) => ({
                        id: m._id,
                        name: m.name,
                        email: m.email,
                        college: team.collegeName,
                        teamName: team.teamName,
                        teamId: team._id,
                    }))
                );

                setParticipants(rows);
                setSubmissions(subsRes.data.submissions || []);
            } catch (err) {
                toast.error("Failed to load admin data");
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    const removeMember = async (row) => {
        if (!confirm(`Remove ${row.name} from ${row.teamName}`)) return;

        const toastId = toast.loading("Removing pariticipant...");

        try {
            await api.delete(`/admin/team/${row.teamId}/member/${row.id}`);

            setParticipants((prev) => prev.filter((p) => p.id !== row.id));

            toast.success("Participant removed", { id: toastId });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed", {
                id: toastId,
            });
        }
    };

    const sendNotification = async () => {
        if (!notifText.trim() || !notifTitle.trim()) {
            toast.error("Title and message both are required");
            return;
        }

        const toastId = toast.loading("Sending notification...");

        try {
            await api.post("/admin/notification", {
                title: notifTitle,
                message: notifText,
            });

            toast.success("Notification sent", { id: toastId });

            setNotifText("");
            setNotifTitle("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send", {
                id: toastId,
            });
        }
    };

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <div className="text-xs font-semibold tracking-widest text-zinc-400">
                        ADMIN DASHBOARD
                    </div>
                    <h1 className="mt-2 text-3xl font-black tracking-wider text-white">
                        Manage Participants
                    </h1>
                    <p className="mt-2 text-sm text-zinc-300">
                        Remove participants from teams, review submissions, and
                        post notifications.
                    </p>
                </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <Card title="PARTICIPANTS" className="lg:col-span-2">
                    <Table
                        columns={["Name", "Email", "College", "Team Name"]}
                        rows={participants}
                        renderRowActions={(row) => (
                            <Button
                                variant="secondary"
                                className="px-3 py-1"
                                type="button"
                                onClick={() => removeMember(row)}
                            >
                                Remove
                            </Button>
                        )}
                    />
                    <div className="mt-3 text-xs text-zinc-500">
                        Actions are UI-only. Wire to backend with Axios.
                    </div>
                </Card>

                <Card title="NOTIFICATIONS" className="lg:col-span-1">
                    <div className="text-sm text-zinc-300">
                        Write a text notification to broadcast to all
                        participants.
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-300">
                                Title
                            </div>
                            <input
                                value={notifTitle}
                                onChange={(e) => setNotifTitle(e.target.value)}
                                className="w-full rounded-lg border border-white/10 bg-festival-panel px-3 py-2 text-sm text-white"
                                placeholder="e.g. Submission Deadline"
                            />
                        </div>

                        <div>
                            <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-300">
                                Message
                            </div>
                            <textarea
                                value={notifText}
                                onChange={(e) => setNotifText(e.target.value)}
                                rows={5}
                                className="w-full resize-none rounded-lg border border-white/10 bg-festival-panel px-3 py-2 text-sm text-white"
                                placeholder="Write detailed notification..."
                            />
                        </div>
                    </div>

                    <div className="mt-3 flex gap-3">
                        <Button
                            type="button"
                            onClick={sendNotification}
                            className="w-full"
                        >
                            Post
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                setNotifText("");
                                setNotifTitle("");
                            }}
                            className="w-full"
                        >
                            Clear
                        </Button>
                    </div>
                </Card>
            </div>

            <div className="mt-6">
                <Card title="TEAM SUBMISSIONS">
                    <div className="grid gap-4 md:grid-cols-2">
                        {submissions.map((s) => (
                            <div
                                key={s.id}
                                className="rounded-2xl border border-white/10 bg-festival-panel p-4"
                            >
                                <div className="text-sm font-extrabold text-white">
                                    {s.teamName}
                                </div>
                                <div className="mt-3 space-y-2 text-sm">
                                    <div>
                                        <div className="text-xs font-semibold tracking-widest text-zinc-400">
                                            YOUTUBE
                                        </div>
                                        {s.submission.youtubeLink ? (
                                            <a
                                                href={s.submission.youtubeLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-1 block truncate text-festival-accent hover:underline"
                                            >
                                                {s.submission.youtubeLink}
                                            </a>
                                        ) : (
                                            <div className="mt-1 text-zinc-500">
                                                Not uploaded
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold tracking-widest text-zinc-400">
                                            DRIVE
                                        </div>
                                        {s.submission.driveLink ? (
                                            <a
                                                href={s.submission.driveLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-1 block truncate text-festival-accent hover:underline"
                                            >
                                                {s.submission.driveLink}
                                            </a>
                                        ) : (
                                            <div className="mt-1 text-zinc-500">
                                                Not uploaded
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </main>
    );
}
