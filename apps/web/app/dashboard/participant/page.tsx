"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Upload, Bell, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getMyTeam, getNotifications } from "@/lib/services";
import { Team, Notification } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import StatCard from "../../../components/dashboard/StatCard";
import SectionHeading from "../../../components/ui/SectionHeading";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorState from "../../../components/ui/ErrorState";

export default function ParticipantDashboard() {
  const [team, setTeam] = useState<Team | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teamRes, notifRes] = await Promise.all([
          getMyTeam(),
          getNotifications(),
        ]);

        if (teamRes.success) setTeam(teamRes.team);
        if (notifRes.success) setNotifications(notifRes.notifications);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner fullPage />;
  if (error)
    return (
      <ErrorState
        title="Something went wrong"
        description={error}
        onRetry={() => window.location.reload()}
      />
    );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      <div>
        <h1 className="font-heading text-4xl mb-2">Welcome back!</h1>
        <p className="text-text-muted">
          Here's what's happening with your team.
        </p>
      </div>

      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatCard
          label="Team"
          value={team?.teamName || "No team"}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          label="Members"
          value={team?.members.length || 0}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          label="Submission"
          value={team?.submission ? "Submitted" : "Pending"}
          icon={<Upload className="w-5 h-5" />}
          accent={!team?.submission}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          <SectionHeading title="Recent Notifications" />

          <div className="space-y-4">
            {notifications.slice(0, 3).map((notif) => (
              <div
                key={notif._id}
                className="bg-bg-card border border-border rounded-xl p-5 flex gap-4"
              >
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{notif.title}</h3>
                  <p className="text-text-muted mt-1 text-sm">
                    {notif.message}
                  </p>
                  <p className="text-xs text-text-muted/60 mt-3">
                    {formatDateTime(notif.sendAt)}
                  </p>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="text-center py-8 text-text-muted bg-bg-card border border-border rounded-xl">
                No recent notifications
              </div>
            )}

            {notifications.length > 0 && (
              <Link
                href="/dashboard/participant/notifications"
                className="inline-flex items-center text-accent hover:text-accent-secondary text-sm font-medium gap-1"
              >
                View all notifications <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="bg-gradient-to-br from-bg-card to-bg-elevated border border-border rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -mr-10 -mt-10" />

            <h3 className="font-heading text-2xl mb-2 relative z-10">
              Submit Your Film
            </h3>
            <p className="text-text-muted text-sm mb-6 relative z-10">
              Ready to submit? Make sure your film meets all guidelines before
              submitting the final links.
            </p>

            <Link
              href="/dashboard/participant/submission"
              className="relative z-10 inline-flex w-full justify-center items-center gap-2 bg-accent hover:bg-accent-secondary text-bg-primary font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              Go to Submission
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
