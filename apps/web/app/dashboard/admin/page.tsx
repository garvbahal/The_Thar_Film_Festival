"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, FileVideo, Bell, ArrowRight, ShieldCheck } from "lucide-react";
import StatCard from "../../../components/dashboard/StatCard";
import SectionHeading from "../../../components/ui/SectionHeading";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorState from "../../../components/ui/ErrorState";
import {
  getAllTeams,
  getAllSubmissions,
  getNotifications,
} from "@/lib/services";
import { formatDateTime } from "@/lib/utils";
import { Team, Notification } from "@/lib/types";

export default function AdminOverview() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [teams, setTeams] = useState<Team[]>([]);
  const [submissions, setSubmissions] = useState<Team[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [teamsData, submissionsData, notificationsData] = await Promise.all(
        [getAllTeams(), getAllSubmissions(), getNotifications()],
      );
      setTeams((teamsData as any).teams || []);
      setSubmissions((submissionsData as any).submissions || []);
      setNotifications((notificationsData as any).notifications || []);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorState description={error} onRetry={fetchData} />;
  }

  const totalParticipants = teams.reduce(
    (acc, team) => acc + (team.members ? team.members.length : 0),
    0,
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-4xl text-text-main md:text-5xl">
          Admin <span className="text-accent">Overview</span>
        </h1>
        <p className="mt-2 text-text-muted">
          Manage the festival, participants, and submissions.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            label="Total Teams"
            value={teams.length}
            icon={<ShieldCheck size={24} />}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="Participants"
            value={totalParticipants}
            icon={<Users size={24} />}
            accent
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="Submissions"
            value={submissions.length}
            icon={<FileVideo size={24} />}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="Notifications"
            value={notifications.length}
            icon={<Bell size={24} />}
          />
        </motion.div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SectionHeading
            title="Recent Announcements"
            description="Latest notifications sent to participants."
          />

          <div className="space-y-4">
            {notifications.slice(0, 3).map((notif, i) => (
              <motion.div
                key={notif._id || i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-xl border border-border bg-bg-card p-5"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading text-xl text-text-main">
                    {notif.title}
                  </h3>
                  <span className="text-xs text-text-muted">
                    {formatDateTime(notif.sendAt || "")}
                  </span>
                </div>
                <p className="text-text-muted text-sm">{notif.message}</p>
              </motion.div>
            ))}

            {notifications.length === 0 && (
              <div className="rounded-xl border border-border border-dashed p-8 text-center text-text-muted">
                No announcements sent yet.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading title="Quick Actions" />
          <div className="flex flex-col gap-4">
            <Link href="/dashboard/admin/participants">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group flex items-center justify-between rounded-xl border border-border bg-bg-card p-4 transition-colors hover:border-accent hover:bg-bg-elevated"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-bg-elevated p-2 text-text-muted group-hover:text-accent">
                    <Users size={20} />
                  </div>
                  <span className="font-medium">Manage Participants</span>
                </div>
                <ArrowRight
                  size={18}
                  className="text-text-muted group-hover:text-accent"
                />
              </motion.div>
            </Link>

            <Link href="/dashboard/admin/submissions">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group flex items-center justify-between rounded-xl border border-border bg-bg-card p-4 transition-colors hover:border-accent hover:bg-bg-elevated"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-bg-elevated p-2 text-text-muted group-hover:text-accent">
                    <FileVideo size={20} />
                  </div>
                  <span className="font-medium">View Submissions</span>
                </div>
                <ArrowRight
                  size={18}
                  className="text-text-muted group-hover:text-accent"
                />
              </motion.div>
            </Link>

            <Link href="/dashboard/admin/notifications">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group flex items-center justify-between rounded-xl border border-border bg-bg-card p-4 transition-colors hover:border-accent hover:bg-bg-elevated"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-bg-elevated p-2 text-text-muted group-hover:text-accent">
                    <Bell size={20} />
                  </div>
                  <span className="font-medium">Send Notification</span>
                </div>
                <ArrowRight
                  size={18}
                  className="text-text-muted group-hover:text-accent"
                />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
