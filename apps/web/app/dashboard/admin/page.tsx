"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, FileVideo, Bell, ArrowRight, ShieldCheck } from "lucide-react";
import StatCard from "../../../components/dashboard/StatCard";
import SectionHeading from "../../../components/ui/SectionHeading";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorState from "../../../components/ui/ErrorState";
import { useGetAllNotifications } from "../../../hooks/participant.hooks";
import axios from "axios";
import {
  useGetAllSubmissions,
  useGetAllTeamDetails,
} from "../../../hooks/admin.hooks";

export default function AdminOverview() {
  const {
    data: allNotifications,
    isPending: isAllNotificationsPending,
    isError: isAllNotificationsError,
    error: allNotificationsError,
    refetch: retryAllNotifications,
  } = useGetAllNotifications();

  const {
    data: allTeamDetails,
    isPending: isAllTeamDetailsPending,
    isError: isAllTeamDetailsError,
    error: allTeamDetailsError,
    refetch: retryAllTeamDetails,
  } = useGetAllTeamDetails();

  const {
    data: allSubmissionsData,
    isPending: isAllSubmissionsDataPending,
    isError: isAllSubmissionsDataError,
    error: allSubmissionsDataError,
    refetch: retryAllSubmissions,
  } = useGetAllSubmissions();

  if (
    isAllNotificationsPending ||
    isAllTeamDetailsPending ||
    isAllSubmissionsDataPending
  ) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAllNotificationsError) {
    return (
      <ErrorState
        description={`${axios.isAxiosError(allNotificationsError) ? allNotificationsError.response?.data.message || "Something went wrong" : "Something went wrong"}`}
        onRetry={retryAllNotifications}
      />
    );
  }

  if (isAllSubmissionsDataError) {
    return (
      <ErrorState
        description={`${axios.isAxiosError(allSubmissionsDataError) ? allSubmissionsDataError.response?.data.message || "Something went wrong" : "Something went wrong"}`}
        onRetry={retryAllSubmissions}
      />
    );
  }

  if (isAllNotificationsError) {
    return (
      <ErrorState
        description={`${axios.isAxiosError(allTeamDetailsError) ? allTeamDetailsError.response?.data.message || "Something went wrong" : "Something went wrong"}`}
        onRetry={retryAllTeamDetails}
      />
    );
  }

  const totalParticipants = allTeamDetails?.teams.reduce(
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
            value={allTeamDetails?.teams?.length || 0}
            icon={<ShieldCheck size={24} />}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="Participants"
            value={totalParticipants || 0}
            icon={<Users size={24} />}
            accent
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="Submissions"
            value={allSubmissionsData.submissions.length}
            icon={<FileVideo size={24} />}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="Notifications"
            value={allNotifications.notifications.length}
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
            {allNotifications.notifications.slice(0, 3).map((notif, i) => (
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
                    {new Date(notif.sendAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }) || ""}
                  </span>
                </div>
                <p className="text-text-muted text-sm">{notif.message}</p>
              </motion.div>
            ))}

            {allNotifications.notifications.length === 0 && (
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
