import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMyAuth,
  loginAuth,
  logoutService,
  requestOtpSevice,
  verifyOtpService,
} from "../services/auth.services";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getMyAuth,
    retry: false,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginAuth,
  });
};

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: requestOtpSevice,
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtpService,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutService,
  });
};
