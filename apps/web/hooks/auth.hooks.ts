import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["auth"],
      });
    },
  });
};
