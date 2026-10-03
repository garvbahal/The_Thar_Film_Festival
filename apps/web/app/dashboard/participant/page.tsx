"use client";

import Link from "next/link";
import { Users, Upload, Bell, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../../../components/dashboard/StatCard";
import SectionHeading from "../../../components/ui/SectionHeading";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorState from "../../../components/ui/ErrorState";
import {
  useGetAllNotifications,
  useGetMyTeamDetails,
} from "../../../hooks/participant.hooks";
import axios from "axios";

export default function ParticipantDashboard() {
  const {
    data: notificationData,
    isPending: isNotificationsPending,
    isError: isNotificationError,
    error: notificationError,
  } = useGetAllNotifications();

  const {
    data: teamData,
    isPending: isTeamDataPending,
    isError: isTeamDataError,
    error: teamDataError,
  } = useGetMyTeamDetails();

  if (isNotificationsPending || isTeamDataPending) {
    return <LoadingSpinner fullPage />;
  }

  if (isNotificationError)
    return (
      <ErrorState
        title="Something went wrong"
        description={`${axios.isAxiosError(notificationError) ? `${notificationError.response?.data.message}` : `Something went wrong`} `}
        onRetry={() => window.location.reload()}
      />
    );

  if (isTeamDataError)
    return (
      <ErrorState
        title="Something went wrong"
        description={`${axios.isAxiosError(teamDataError) ? `${teamDataError.response?.data.message}` : `Something went wrong`} `}
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
          value={teamData.team?.teamName || "No team"}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          label="Members"
          value={teamData.team.members.length || 0}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          label="Submission"
          value={
            !!teamData.team?.submission?.driveLink ||
            !!teamData.team?.submission?.youtubeLink
              ? "Submitted"
              : "Pending"
          }
          icon={<Upload className="w-5 h-5" />}
          accent={!teamData.team?.submission}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          <SectionHeading title="Recent Notifications" />

          <div className="space-y-4">
            {notificationData.notifications.slice(0, 3).map((notif, indx) => (
              <div
                key={indx}
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
                    {new Date(notif.sendAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {notificationData.notifications.length === 0 && (
              <div className="text-center py-8 text-text-muted bg-bg-card border border-border rounded-xl">
                No recent notifications
              </div>
            )}

            {notificationData.notifications.length > 0 && (
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
