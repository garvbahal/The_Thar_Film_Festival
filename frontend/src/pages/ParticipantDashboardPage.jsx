import { useMemo, useState } from "react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";

export default function ParticipantDashboardPage() {
    const [youtubeLink, setYoutubeLink] = useState("");
    const [driveLink, setDriveLink] = useState("");

    const team = useMemo(
        () => ({
            teamName: "Desert Frames",
            members: [
                "Ayesha Khan (Lead)",
                "Rohit Verma",
                "Sneha Patel",
                "Faizan Ali",
            ],
        }),
        []
    );

    const notifications = useMemo(
        () => [
            {
                id: "n1",
                title: "Submission Guidelines",
                body: "Ensure your YouTube link is unlisted and accessible. Drive links must have viewer access enabled.",
                time: "Today, 6:30 PM",
            },
            {
                id: "n2",
                title: "Deadline Reminder",
                body: "Submit your final links before the deadline. Late submissions may not be evaluated.",
                time: "Yesterday, 9:15 AM",
            },
        ],
        []
    );

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
                <Button variant="secondary">Logout (UI)</Button>
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
                                    {m}
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
                            onClick={() => {
                                // UI only
                            }}
                        >
                            Save Links
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
                                        {n.time}
                                    </div>
                                </div>
                                <div className="mt-2 text-sm leading-6 text-zinc-300">
                                    {n.body}
                                </div>
                            </article>
                        ))}
                    </div>
                </Card>
            </div>
        </main>
    );
}
