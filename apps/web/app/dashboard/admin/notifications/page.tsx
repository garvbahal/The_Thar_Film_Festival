"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Bell, Megaphone, CheckCircle2, AlertCircle } from "lucide-react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import SectionHeading from "../../../../components/ui/SectionHeading";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import EmptyState from "../../../../components/ui/EmptyState";
import { useGetAllNotifications } from "../../../../hooks/participant.hooks";
import axios from "axios";
import { useSendNotification } from "../../../../hooks/admin.hooks";
import toast from "react-hot-toast";

type NotificationFormValues = {
  title: string;
  message: string;
};

export default function NotificationsPage() {
  const {
    data: allNotifications,
    isPending: isAllNotificationsPending,
    isError: isAllNotificationsError,
    error: allNotificationsError,
  } = useGetAllNotifications();

  const { mutate: sendNotification, isPending: isSending } =
    useSendNotification();

  const { register, handleSubmit, reset } = useForm<NotificationFormValues>();

  const onSubmit = (submitData: NotificationFormValues) => {
    sendNotification(submitData, {
      onSuccess: (data) => {
        toast.success(data.message);
        reset();
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }
      },
    });
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
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSending}
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

        {isAllNotificationsPending ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <LoadingSpinner size="md" />
          </div>
        ) : isAllNotificationsError ? (
          <div className="rounded-xl border border-border border-dashed p-8 text-center text-error">
            {axios.isAxiosError(allNotificationsError)
              ? allNotificationsError.response?.data.message ||
                "Something Went wrong"
              : "Something went wrong"}
          </div>
        ) : allNotifications.notifications.length === 0 ? (
          <EmptyState
            icon={<Bell size={48} />}
            title="No Announcements Yet"
            description="You haven't sent any notifications to participants."
          />
        ) : (
          <div className="space-y-4">
            {allNotifications.notifications.map((notif, index) => (
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
                    {new Date(notif.sendAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
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
