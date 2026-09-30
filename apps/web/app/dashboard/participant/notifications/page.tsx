"use client";

import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../../../../components/ui/SectionHeading";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import ErrorState from "../../../../components/ui/ErrorState";
import EmptyState from "../../../../components/ui/EmptyState";
import { useGetAllNotifications } from "../../../../hooks/participant.hooks";
import axios from "axios";

export default function NotificationsPage() {
  const {
    data: notifications,
    isPending,
    isError,
    error: notificationError,
  } = useGetAllNotifications();

  if (isPending) return <LoadingSpinner fullPage />;

  if (isError)
    return (
      <ErrorState
        title="Failed to load"
        description={`${axios.isAxiosError(notificationError) ? `${notificationError.response?.data.message}` : `Something went wrong`} `}
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
    <div className="space-y-8 max-w-4xl mx-auto">
      <SectionHeading
        title="Notifications"
        description="Important updates and announcements from the festival organizers."
      />

      {notifications.notifications.length === 0 ? (
        <EmptyState
          icon={<Bell />}
          title="No notifications yet"
          description="Check back later for updates from the organizers."
        />
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {notifications.notifications.map((notif, indx) => (
            <motion.div
              key={indx}
              variants={item}
              className="bg-bg-card border border-border rounded-xl p-5 md:p-6 flex gap-4 hover:border-text-muted/30 transition-colors"
            >
              <div className="mt-1 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{notif.title}</h3>
                  <span className="text-xs text-text-muted/60 whitespace-nowrap bg-bg-elevated px-2 py-1 rounded-md">
                    {notif.sendAt.toLocaleDateString("en-US", {
                      day: "numeric",
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <p className="text-text-muted leading-relaxed whitespace-pre-line">
                  {notif.message}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
