"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Trash2, Users } from "lucide-react";
import Input from "../../../../components/ui/Input";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import ErrorState from "../../../../components/ui/ErrorState";
import ConfirmationDialog from "../../../../components/ui/ConfirmationDialog";
import {
  useGetAllTeamDetails,
  useRemoveParticipant,
} from "../../../../hooks/admin.hooks";
import axios from "axios";
import toast from "react-hot-toast";

type FlattenedParticipant = {
  teamId: string;
  teamName: string;
  collegeName: string;
  isLeader: boolean;
  name: string;
  email: string;
  _id: string;
};

export default function ParticipantsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: allTeamDetails,
    isError: isAllTeamDetailsError,
    isPending: isAllTeamDetailsPending,
    error: allTeamDetailsError,
    refetch: retryAllTeamDetails,
  } = useGetAllTeamDetails();

  const { mutate: removeParticipant, isPending: isDeleting } =
    useRemoveParticipant();

  // Delete dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<FlattenedParticipant | null>(null);

  const handleDeleteClick = (participant: FlattenedParticipant) => {
    setSelectedParticipant(participant);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedParticipant) return;

    removeParticipant(
      { teamId: selectedParticipant.teamId, userId: selectedParticipant._id },
      {
        onSuccess: (data) => {
          setIsDialogOpen(false);
          toast.success(data.message);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message || "Something went wrong");
          } else {
            toast.error("Something went wrong");
          }
        },
      },
    );
  };

  if (isAllTeamDetailsPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAllTeamDetailsError) {
    return (
      <ErrorState
        description={
          axios.isAxiosError(allTeamDetailsError)
            ? allTeamDetailsError.response?.data.message ||
              "Something went wrong"
            : "Something went wrong"
        }
        onRetry={retryAllTeamDetails}
      />
    );
  }

  const participantDetails: FlattenedParticipant[] =
    allTeamDetails?.teams.flatMap(
      (team) =>
        team.members?.map((participant) => ({
          name: participant.name,
          email: participant.email,
          teamId: team._id,
          teamName: team.teamName,
          collegeName: team.collegeName,
          isLeader: participant.role === "leader",
          _id: participant._id,
        })) ?? [],
    ) ?? [];

  const filteredParticipants = participantDetails.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.email && p.email.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-4xl text-text-main md:text-5xl">
            Manage <span className="text-accent">Participants</span>
          </h1>
          <p className="mt-2 text-text-muted flex items-center gap-2">
            <Users size={16} /> Total: {participantDetails.length} Participants
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-72"
        >
          <Input
            label=""
            placeholder="Search name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-bg-card overflow-hidden shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-elevated text-xs uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Team</th>
                <th className="px-6 py-4 font-medium">College</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((participant) => (
                  <tr
                    key={participant._id}
                    className="transition-colors hover:bg-bg-elevated/50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-text-main">
                      {participant.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-text-muted">
                      {participant.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-text-main">
                      {participant.teamName}
                    </td>
                    <td className="px-6 py-4 text-text-muted max-w-[200px] truncate">
                      {participant.collegeName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          ${
                            participant.isLeader
                              ? "bg-accent/10 text-accent"
                              : "bg-bg-elevated text-text-muted"
                          }`}
                      >
                        {participant.isLeader ? "Leader" : "Member"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteClick(participant)}
                        className="p-2 text-error/60 transition-colors hover:text-error hover:bg-error/10 rounded-lg"
                        title="Remove Participant"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-text-muted"
                  >
                    No participants found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onCancel={() => !isDeleting && setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Participant"
        message={
          selectedParticipant
            ? `Are you sure you want to remove ${selectedParticipant.name} from team ${selectedParticipant.teamName}? This action cannot be undone.`
            : "Are you sure you want to delete this participant?"
        }
        confirmLabel="Remove Participant"
        cancelLabel="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
