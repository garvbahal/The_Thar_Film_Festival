"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ExternalLink,
  FileVideo,
  CirclePlay,
  Link as LinkIcon,
} from "lucide-react";
import Input from "../../../../components/ui/Input";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import ErrorState from "../../../../components/ui/ErrorState";
import EmptyState from "../../../../components/ui/EmptyState";
import { useGetAllSubmissions } from "../../../../hooks/admin.hooks";
import axios from "axios";

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: submissionsData,
    isPending: isSubmissionsPending,
    isError: isSubmissionError,
    error: submissionError,
    refetch: retrySubmissions,
  } = useGetAllSubmissions();

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

  if (isSubmissionsPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isSubmissionError) {
    return (
      <ErrorState
        description={`${axios.isAxiosError(submissionError) ? submissionError.response?.data.message || "Something went wrong" : "Something went wrong"}`}
        onRetry={retrySubmissions}
      />
    );
  }

  const filteredSubmissions = submissionsData.submissions.filter((team) =>
    team.teamName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-4xl text-text-main md:text-5xl">
            View <span className="text-accent">Submissions</span>
          </h1>
          <p className="mt-2 text-text-muted flex items-center gap-2">
            <FileVideo size={16} /> Total: {submissionsData.submissions.length}{" "}
            Submissions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-72"
        >
          <Input
            label=""
            placeholder="Search by team name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
          />
        </motion.div>
      </div>

      {submissionsData.submissions.length === 0 ? (
        <EmptyState
          icon={<FileVideo size={48} />}
          title="No Submissions Yet"
          description="Teams haven't submitted their links yet."
        />
      ) : filteredSubmissions.length === 0 ? (
        <div className="rounded-xl border border-border border-dashed p-12 text-center text-text-muted">
          No submissions found matching "{searchQuery}".
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredSubmissions.map((team) => (
            <motion.div
              key={team._id}
              variants={itemVariants}
              className="flex flex-col justify-between rounded-xl border border-border bg-bg-card p-5 transition-colors hover:border-accent/50 shadow-sm"
            >
              <div className="space-y-4">
                <div>
                  <h3
                    className="text-lg font-semibold text-text-main line-clamp-1"
                    title={team.teamName}
                  >
                    {team.teamName}
                  </h3>
                  <p
                    className="text-sm text-text-muted line-clamp-1"
                    title={team.collegeName}
                  >
                    {team.collegeName}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-text-muted">
                    Members
                  </p>
                  <p className="text-sm text-text-main line-clamp-2">
                    {team.members?.map((m) => m.name).join(", ") ||
                      "No members"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex flex-col gap-2">
                  {team.submission?.youtubeLink && (
                    <a
                      href={team.submission.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg bg-bg-elevated px-4 py-2.5 text-sm font-medium text-text-main transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      <div className="flex items-center gap-2">
                        <CirclePlay size={16} className="text-error" />
                        <span>YouTube Link</span>
                      </div>
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {team.submission?.driveLink && (
                    <a
                      href={team.submission.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg bg-bg-elevated px-4 py-2.5 text-sm font-medium text-text-main transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      <div className="flex items-center gap-2">
                        <LinkIcon size={16} className="text-blue-400" />
                        <span>Drive Link</span>
                      </div>
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {!team.submission?.youtubeLink &&
                    !team.submission?.driveLink && (
                      <div className="rounded-lg bg-bg-elevated px-4 py-2.5 text-sm text-text-muted italic text-center">
                        Links not provided
                      </div>
                    )}
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-text-muted text-center">
                    Submitted at{" "}
                    {team.submission?.submittedAt
                      ? new Date(team.submission.submittedAt).toLocaleString(
                          "en-US",
                          {
                            day: "2-digit",
                            year: "numeric",
                            month: "short",
                          },
                        )
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
