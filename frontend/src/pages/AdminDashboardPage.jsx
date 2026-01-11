import { useMemo, useState } from "react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";

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
    const [notifText, setNotifText] = useState("");

    const participants = useMemo(
        () => [
            {
                id: "p1",
                name: "Ayesha Khan",
                email: "ayesha@college.edu",
                college: "Thar Institute of Arts",
                teamName: "Desert Frames",
            },
            {
                id: "p2",
                name: "Rohit Verma",
                email: "rohit@college.edu",
                college: "Thar Institute of Arts",
                teamName: "Desert Frames",
            },
            {
                id: "p3",
                name: "Maya Singh",
                email: "maya@uni.edu",
                college: "City University",
                teamName: "Midnight Reels",
            },
        ],
        []
    );

    const submissions = useMemo(
        () => [
            {
                id: "s1",
                teamName: "Desert Frames",
                youtube: "https://youtube.com/watch?v=example",
                drive: "https://drive.google.com/file/d/example",
            },
            {
                id: "s2",
                teamName: "Midnight Reels",
                youtube: "https://youtube.com/watch?v=example2",
                drive: "",
            },
        ],
        []
    );

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
                <Button variant="secondary">Logout (UI)</Button>
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
                                onClick={() => {
                                    // UI only
                                }}
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
                    <div className="mt-4">
                        <label className="block">
                            <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-300">
                                Notification text
                            </div>
                            <textarea
                                value={notifText}
                                onChange={(e) => setNotifText(e.target.value)}
                                rows={6}
                                className="w-full resize-none rounded-lg border border-white/10 bg-festival-panel px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-festival-accent/60 focus:outline-none focus:ring-2 focus:ring-festival-accent/20"
                                placeholder="e.g., Final submission deadline is Friday 5 PM."
                            />
                        </label>
                    </div>
                    <div className="mt-3 flex gap-3">
                        <Button
                            type="button"
                            onClick={() => {
                                // UI only
                            }}
                            className="w-full"
                        >
                            Post
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setNotifText("")}
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
                                        {s.youtube ? (
                                            <a
                                                href={s.youtube}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-1 block truncate text-festival-accent hover:underline"
                                            >
                                                {s.youtube}
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
                                        {s.drive ? (
                                            <a
                                                href={s.drive}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-1 block truncate text-festival-accent hover:underline"
                                            >
                                                {s.drive}
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
