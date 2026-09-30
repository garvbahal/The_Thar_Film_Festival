"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Bell, Megaphone, CheckCircle2, AlertCircle } from "lucide-react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import SectionHeading from "../../../../components/ui/SectionHeading";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import EmptyState from "../../../../components/ui/EmptyState";
import { createNotification, getNotifications } from "@/lib/services";
import { Notification } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

const notificationSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
  });

  const fetchNotificationList = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const res = await getNotifications();
      setNotifications((res as any).notifications || []);
    } catch (err: any) {
      setFetchError(err.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificationList();
  }, []);

  const onSubmit = async (data: NotificationFormValues) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      await createNotification({
        title: data.title,
        message: data.message,
      });

      setSubmitSuccess(true);
      reset();

      // Refresh list
      await fetchNotificationList();

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to send notification");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-4xl text-text-main md:text-5xl">
          Manage <span className="text-accent">Announcements</span>
        </h1>
        <p className="mt-2 text-text-muted flex items-center gap-2">
          <Bell size={16} /> Send broadcast notifications to all participants
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-bg-card p-6 shadow-sm max-w-3xl"
      >
        <h2 className="mb-6 font-heading text-xl text-text-main">
          SEND ANNOUNCEMENT
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Title"
            placeholder="E.g., Submission Deadline Extended"
            {...register("title")}
            error={errors.title?.message}
            icon={<Megaphone size={18} />}
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-main">
              Message
            </label>
            <div className="relative">
              <textarea
                placeholder="Type your announcement here..."
                {...register("message")}
                className="w-full min-h-[120px] resize-y rounded-lg border border-border bg-bg-primary px-4 py-3 text-sm text-text-main outline-none transition-all placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
            {errors.message?.message && (
              <p className="text-xs text-error">{errors.message.message}</p>
            )}
          </div>

          {submitError && (
            <div className="flex items-center gap-2 rounded-lg bg-error/10 p-3 text-sm text-error">
              <AlertCircle size={18} />
              <p>{submitError}</p>
            </div>
          )}

          {submitSuccess && (
            <div className="flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm text-success">
              <CheckCircle2 size={18} />
              <p>Notification sent successfully!</p>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              icon={<Megaphone size={18} />}
            >
              Publish Notification
            </Button>
          </div>
        </form>
      </motion.div>

      <div className="h-px bg-border max-w-5xl" />

      <div className="max-w-5xl space-y-6">
        <SectionHeading
          title="Previously Sent"
          description="History of all announcements"
        />

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <LoadingSpinner size="md" />
          </div>
        ) : fetchError ? (
          <div className="rounded-xl border border-border border-dashed p-8 text-center text-error">
            {fetchError}
          </div>
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={<Bell size={48} />}
            title="No Announcements Yet"
            description="You haven't sent any notifications to participants."
          />
        ) : (
          <div className="space-y-4">
            {notifications.map((notif, index) => (
              <motion.div
                key={notif._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border bg-bg-card p-6 shadow-sm transition-colors hover:border-accent/30"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="font-heading text-2xl text-text-main tracking-wide">
                    {notif.title}
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-bg-elevated px-3 py-1 text-xs font-medium text-text-muted">
                    {formatDateTime(notif.sendAt || "")}
                  </span>
                </div>
                <p className="text-text-muted whitespace-pre-wrap">
                  {notif.message}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
