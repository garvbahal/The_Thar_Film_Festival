"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, GraduationCap } from "lucide-react";
import { useForm } from "react-hook-form";
import AuthLayout from "../../../components/auth/AuthLayout";
import TeamSelection from "../../../components/auth/TeamSelection";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useRequestOtp } from "../../../hooks/auth.hooks";
import { requestOtpFormValues } from "../../../types/auth.types";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [teamSelected, setTeamSelected] = useState(false);

  const { register, handleSubmit, watch, setValue } =
    useForm<requestOtpFormValues>({
      defaultValues: {
        teamOption: "create",
      },
    });

  const teamOption = watch("teamOption");
  const teamName = watch("teamName") || "";
  const teamCode = watch("teamCode") || "";

  const { mutate, isPending } = useRequestOtp();

  const onSubmit = (requestOtpData: requestOtpFormValues) => {
    mutate(requestOtpData, {
      onSuccess: (data) => {
        toast.success(data.message);
        sessionStorage.setItem("email", requestOtpData.email);
        router.replace("/verify-otp");
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
    <AuthLayout>
      <div className="flex flex-col space-y-6 py-8 h-full overflow-y-auto custom-scrollbar">
        <div>
          <h1 className="font-heading text-3xl text-text-main mb-2 tracking-wider">
            JOIN THE FESTIVAL
          </h1>
          <p className="text-text-muted">
            Create your account and start your filmmaking journey
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Full Name"
            icon={<User className="w-5 h-5 text-text-muted" />}
            {...register("name")}
            placeholder="John Doe"
          />

          <Input
            label="College Name"
            icon={<GraduationCap className="w-5 h-5 text-text-muted" />}
            {...register("collegeName")}
            placeholder="University of Cinematic Arts"
          />

          <Input
            label="Email Address"
            icon={<Mail className="w-5 h-5 text-text-muted" />}
            {...register("email")}
            placeholder="you@college.edu"
          />

          <Input
            label="Password"
            type="password"
            icon={<Lock className="w-5 h-5 text-text-muted" />}
            {...register("password")}
            placeholder="••••••••"
          />

          <div className="pt-2">
            <h2 className="font-heading text-xl text-text-main mb-3">
              HOW WOULD YOU LIKE TO PARTICIPATE?
            </h2>
            <TeamSelection
              selectedOption={teamOption}
              onSelect={(val) => {
                setValue("teamOption", val, { shouldValidate: true });
                setTeamSelected(true);
              }}
              teamName={teamName}
              teamCode={teamCode}
              onTeamNameChange={(val) =>
                setValue("teamName", val, { shouldValidate: true })
              }
              onTeamCodeChange={(val) =>
                setValue("teamCode", val, { shouldValidate: true })
              }
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-6"
            isLoading={isPending}
          >
            CREATE ACCOUNT
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-accent hover:text-accent-secondary transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
