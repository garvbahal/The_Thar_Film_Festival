"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Video,
  HardDrive,
  ExternalLink,
  AlertCircle,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import ErrorState from "../../../../components/ui/ErrorState";
import {
  useGetMyTeamDetails,
  useSubmitSubmission,
} from "../../../../hooks/participant.hooks";
import toast from "react-hot-toast";
import axios from "axios";

type FormValues = {
  youtubeLink?: string;
  driveLink?: string;
};

export default function SubmissionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({});

  const { mutate, isPending } = useSubmitSubmission();

  const onSubmit = (submitFormData: FormValues) => {
    mutate(submitFormData, {
      onSuccess: (data) => {
        toast.success(data.message);
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

  const {
    data: teamData,
    isPending: isTeamDetailsPending,
    isError: isTeamDetailsError,
    error: teamDetailsError,
  } = useGetMyTeamDetails();

  if (isPending || isTeamDetailsPending) {
    return <LoadingSpinner fullPage />;
  }

  if (isTeamDetailsError)
    return (
      <ErrorState
        title="Failed to load"
        description={`${axios.isAxiosError(teamDetailsError) ? teamDetailsError.response?.data.message || "Something went wrong" : "Something went wrong"}`}
        onRetry={() => window.location.reload()}
      />
    );

  const isSubmitted =
    !!teamData.team?.submission?.youtubeLink ||
    !!teamData.team?.submission?.driveLink;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-10"
    >
      <div className="text-center space-y-4">
        <h1 className="font-heading text-5xl">SUBMIT YOUR FILM</h1>
        <p className="text-text-muted">
          Provide the links to your final film. You must provide at least one
          link. Make sure the Google Drive link has public viewing access.
        </p>
      </div>

      {isSubmitted && (
        <div className="bg-success/10 border border-success/20 rounded-xl p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 bg-success/20 text-success rounded-full flex items-center justify-center">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-success mb-1">
              Film Submitted
            </h2>
            <p className="text-sm text-success/80">
              Your submission has been recorded. You can update your links below
              if needed.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center w-full mt-4">
            {teamData.team.submission?.youtubeLink && (
              <a
                href={teamData.team.submission.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-bg-card hover:bg-bg-elevated border border-border px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <Video className="w-4 h-4 text-error" />
                View on YouTube
                <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
              </a>
            )}
            {teamData.team.submission?.driveLink && (
              <a
                href={teamData.team.submission.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-bg-card hover:bg-bg-elevated border border-border px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <HardDrive className="w-4 h-4 text-[#4285F4]" />
                View on Drive
                <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
              </a>
            )}
          </div>
        </div>
      )}

      <div className="bg-bg-card border border-border rounded-xl p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <Input
              label="YouTube URL"
              id="youtubeLink"
              placeholder="https://youtube.com/watch?v=..."
              icon={<Video className="w-4 h-4" />}
              error={errors.youtubeLink?.message}
              {...register("youtubeLink")}
            />

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-text-muted uppercase font-semibold tracking-wider">
                AND / OR
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Input
              label="Google Drive URL"
              id="driveLink"
              placeholder="https://drive.google.com/file/d/..."
              icon={<HardDrive className="w-4 h-4" />}
              error={errors.driveLink?.message}
              {...register("driveLink")}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isPending}
            >
              {isSubmitted ? "Update Submission" : "Publish Submission"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
