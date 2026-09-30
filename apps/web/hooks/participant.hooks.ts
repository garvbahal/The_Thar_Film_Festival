import { useQuery } from "@tanstack/react-query";
import { getTeamDetailsService } from "../services/participant.services";

export const useGetMyTeamDetails = () => {
  return useQuery({
    queryKey: ["teamDetails"],
    queryFn: getTeamDetailsService,
  });
};
