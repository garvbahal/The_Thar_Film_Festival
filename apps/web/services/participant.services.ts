import axios from "axios";
import {
  getTeamDetailsResponse,
  submitLinkResponse,
} from "../types/participant.types";

export const getTeamDetailsService =
  async (): Promise<getTeamDetailsResponse> => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/team`,
      { withCredentials: true },
    );

    return data;
  };

export const submitLinkService = async ({
  youtubeLink,
  driveLink,
}: {
  youtubeLink?: string;
  driveLink?: string;
}): Promise<submitLinkResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/submit`,
    { youtubeLink, driveLink },
    { withCredentials: true },
  );

  return data;
};
