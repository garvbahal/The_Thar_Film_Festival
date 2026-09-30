"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
import {
  Video,
  HardDrive,
  ExternalLink,
  AlertCircle,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { getMyTeam, submitLinks } from "@/lib/services";
import { Team, Submission } from "@/lib/types";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import ErrorState from "../../../../components/ui/ErrorState";

const schema = z
  .object({
    youtubeLink: z
      .string()
      .url("Must be a valid URL starting with https://")
      .optional()
      .or(z.literal("")),
    driveLink: z
      .string()
      .url("Must be a valid URL starting with https://")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.youtubeLink || data.driveLink, {
    message: "At least one link must be provided",
    path: ["youtubeLink"],
  });

type FormValues = z.infer<typeof schema>;

export default function SubmissionPage() {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await getMyTeam();
        if (res.success) {
          setTeam(res.team);
          if (res.team.submission) {
            reset({
              youtubeLink: res.team.submission.youtubeLink || "",
              driveLink: res.team.submission.driveLink || "",
            });
          }
        }
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      const payload: Partial<FormValues> = {};
      if (data.youtubeLink) payload.youtubeLink = data.youtubeLink;
      if (data.driveLink) payload.driveLink = data.driveLink;

      const res = await submitLinks(payload);

      if (res.success) {
        setSuccess("Submission updated successfully!");
        // Update local team state
        setTeam((prev) =>
          prev ? { ...prev, submission: res.submission } : null,
        );
      } else {
        setError(res.message || "Failed to submit");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;
  if (error && !team)
    return (
      <ErrorState
        title="Failed to load"
        description={error}
        onRetry={() => window.location.reload()}
      />
    );

  const isSubmitted = !!team?.submission;

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
            {team.submission?.youtubeLink && (
              <a
                href={team.submission.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-bg-card hover:bg-bg-elevated border border-border px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <Video className="w-4 h-4 text-error" />
                View on YouTube
                <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
              </a>
            )}
            {team.submission?.driveLink && (
              <a
                href={team.submission.driveLink}
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
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 text-error rounded-lg flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 bg-success/10 border border-success/20 text-success rounded-lg flex items-start gap-3 text-sm">
              <Check className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

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
              isLoading={submitting}
            >
              {isSubmitted ? "Update Submission" : "Publish Submission"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
