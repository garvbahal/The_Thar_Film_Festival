"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { getMyTeam } from "@/lib/services";
import { Team } from "@/lib/types";
import SectionHeading from "../../../../components/ui/SectionHeading";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import ErrorState from "../../../../components/ui/ErrorState";
import EmptyState from "../../../../components/ui/EmptyState";

export default function TeamPage() {
  const { user } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await getMyTeam();
        if (res.success) setTeam(res.team);
      } catch (err: any) {
        setError(err.message || "Failed to load team data");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const copyCode = () => {
    if (team?.uniqueCode) {
      navigator.clipboard.writeText(team.uniqueCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;
  if (error)
    return (
      <ErrorState
        title="Failed to load team"
        description={error}
        onRetry={() => window.location.reload()}
      />
    );
  if (!team)
    return (
      <EmptyState
        icon={<Users />}
        title="No Team Found"
        description="You don't seem to be part of any team."
      />
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div>
          <h1 className="font-heading text-4xl mb-2">{team.teamName}</h1>
          <p className="text-text-muted">{team.collegeName}</p>
        </div>

        <div className="bg-bg-elevated border border-border p-3 rounded-lg flex items-center gap-4">
          <div>
            <div className="text-xs text-text-muted font-medium mb-1 uppercase tracking-wider">
              Team Code
            </div>
            <div className="font-mono text-lg font-semibold">
              {team.uniqueCode}
            </div>
          </div>
          <button
            onClick={copyCode}
            className="p-2 hover:bg-bg-secondary rounded-md transition-colors text-text-muted hover:text-white"
            aria-label="Copy team code"
          >
            {copied ? (
              <Check className="w-5 h-5 text-success" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <SectionHeading
          title="Team Members"
          description={`${team.members.length} members in this team`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.members.map((member) => {
            const isMe = user?.id === member._id;

            return (
              <div
                key={member._id}
                className="bg-bg-card border border-border p-5 rounded-xl flex items-start justify-between group hover:border-text-muted/30 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    {isMe && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted">{member.email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
