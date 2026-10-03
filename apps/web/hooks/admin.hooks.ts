import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllSubmissionsService,
  getAllTeamsService,
  removeMemberFromTeamService,
  sendNotificationService,
} from "../services/admin.services";

export const useGetAllTeamDetails = () => {
  return useQuery({
    queryKey: ["allTeamDetails"],
    queryFn: getAllTeamsService,
  });
};

export const useGetAllSubmissions = () => {
  return useQuery({
    queryKey: ["allSubmissions"],
    queryFn: getAllSubmissionsService,
  });
};

export const useSendNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendNotificationService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allNotifications"],
      });
    },
  });
};

export const useRemoveParticipant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeMemberFromTeamService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTeamDetails"],
      });
    },
  });
};
