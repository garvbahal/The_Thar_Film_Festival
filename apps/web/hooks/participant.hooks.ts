import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getTeamDetailsService,
  submitLinkService,
} from "../services/participant.services";
import { getAllNotificationsService } from "../services/mutual.services";

export const useGetMyTeamDetails = () => {
  return useQuery({
    queryKey: ["teamDetails"],
    queryFn: getTeamDetailsService,
  });
};

export const useGetAllNotifications = () => {
  return useQuery({
    queryKey: ["allNotifications"],
    queryFn: getAllNotificationsService,
  });
};

export const useSubmitSubmission = () => {
  return useMutation({
    mutationFn: submitLinkService,
  });
};
