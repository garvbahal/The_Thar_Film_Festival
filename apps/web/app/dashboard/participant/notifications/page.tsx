"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { getNotifications } from "@/lib/services";
import { Notification } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import SectionHeading from "../../../../components/ui/SectionHeading";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import ErrorState from "../../../../components/ui/ErrorState";
import EmptyState from "../../../../components/ui/EmptyState";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        setLoading(true);
        const res = await getNotifications();
        if (res.success) {
          setNotifications(res.notifications);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifs();
  }, []);

  if (loading) return <LoadingSpinner fullPage />;
  if (error)
    return (
      <ErrorState
        title="Failed to load"
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
    <div className="space-y-8 max-w-4xl mx-auto">
      <SectionHeading
        title="Notifications"
        description="Important updates and announcements from the festival organizers."
      />

      {notifications.length === 0 ? (
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
          {notifications.map((notif) => (
            <motion.div
              key={notif._id}
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
                    {formatDateTime(notif.sendAt)}
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
