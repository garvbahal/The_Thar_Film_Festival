"use client";
import { Users, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../ui/Input";

interface TeamSelectionProps {
  selectedOption: "create" | "join" | null;
  onSelect: (option: "create" | "join") => void;
  teamName: string;
  teamCode: string;
  onTeamNameChange: (val: string) => void;
  onTeamCodeChange: (val: string) => void;
  teamNameError?: string;
  teamCodeError?: string;
}

export default function TeamSelection({
  selectedOption,
  onSelect,
  teamName,
  teamCode,
  onTeamNameChange,
  onTeamCodeChange,
  teamNameError,
  teamCodeError,
}: TeamSelectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onSelect("create")}
          className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
            selectedOption === "create"
              ? "border-accent bg-accent/5"
              : "border-border bg-bg-card hover:bg-bg-elevated"
          }`}
        >
          <Users
            className={`w-8 h-8 mb-2 ${selectedOption === "create" ? "text-accent" : "text-text-muted"}`}
          />
          <span className="font-medium text-text-main">Create a Team</span>
          <span className="text-xs text-text-muted text-center mt-1">
            Start a new filmmaking team
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelect("join")}
          className={`flex flex-col items-center p-4 border rounded-lg transition-all ${
            selectedOption === "join"
              ? "border-accent bg-accent/5"
              : "border-border bg-bg-card hover:bg-bg-elevated"
          }`}
        >
          <UserPlus
            className={`w-8 h-8 mb-2 ${selectedOption === "join" ? "text-accent" : "text-text-muted"}`}
          />
          <span className="font-medium text-text-main">Join a Team</span>
          <span className="text-xs text-text-muted text-center mt-1">
            Join an existing team with a code
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {selectedOption === "create" && (
          <motion.div
            key="create"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <Input
                label="Team Name"
                value={teamName}
                onChange={(e) => onTeamNameChange(e.target.value)}
                error={teamNameError}
                placeholder="Enter your team name"
              />
            </div>
          </motion.div>
        )}

        {selectedOption === "join" && (
          <motion.div
            key="join"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <Input
                label="Team Code"
                value={teamCode}
                onChange={(e) => onTeamCodeChange(e.target.value)}
                error={teamCodeError}
                placeholder="Enter 6-character team code"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
