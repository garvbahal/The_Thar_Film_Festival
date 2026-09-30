"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "../../../components/auth/AuthLayout";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useLogin } from "../../../hooks/auth.hooks";
import toast from "react-hot-toast";
import axios from "axios";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormData>();

  const { mutate, isPending } = useLogin();

  const onSubmitButton = (loginData: LoginFormData) => {
    mutate(loginData, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.replace("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Error while Logging in");
        } else {
          toast.error("Error while Logging in");
        }
      },
    });
  };

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="font-heading text-3xl text-text-main mb-2 tracking-wider">
            WELCOME BACK
          </h1>
          <p className="text-text-muted">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmitButton)} className="space-y-4">
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

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-6"
            isLoading={isPending}
          >
            Login
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-accent hover:text-accent-secondary transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
