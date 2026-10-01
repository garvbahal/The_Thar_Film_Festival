import { useQuery } from "@tanstack/react-query";
import {
  getAllSubmissionsService,
  getAllTeamsService,
} from "../services/admin.services";

export const useGetAllTeamDetails = () => {
  return useQuery({
    queryKey: ["teamDetails"],
    queryFn: getAllTeamsService,
  });
};

export const useGetAllSubmissions = () => {
  return useQuery({
    queryKey: ["allSubmissions"],
    queryFn: getAllSubmissionsService,
  });
};
