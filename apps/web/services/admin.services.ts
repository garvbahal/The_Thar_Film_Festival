import axios from "axios";
import {
  getAllSubmissionsResponse,
  getAllTeamsResponse,
  getTeamDetailsResponse,
  removeMemberFromTeamResponse,
  sendNotificationResponse,
  uploadOrUpdateBrochureResponse,
} from "../types/admin.types";

export const getAllTeamsService = async (): Promise<getAllTeamsResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/teams`,
    { withCredentials: true },
  );

  return data;
};

export const getTeamDetailsService = async ({
  teamId,
}: {
  teamId: string;
}): Promise<getTeamDetailsResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/team/${teamId}`,
    {
      withCredentials: true,
    },
  );

  return data;
};

export const getAllSubmissionsService =
  async (): Promise<getAllSubmissionsResponse> => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/submissions`,
      {
        withCredentials: true,
      },
    );

    return data;
  };

export const removeMemberFromTeamService = async ({
  teamId,
  userId,
}: {
  teamId: string;
  userId: string;
}): Promise<removeMemberFromTeamResponse> => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/team/${teamId}/member/${userId}`,
    { withCredentials: true },
  );

  return data;
};

export const sendNotificationService = async ({
  message,
  title,
}: {
  message: string;
  title: string;
}): Promise<sendNotificationResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/notification`,
    {
      message,
      title,
    },
    { withCredentials: true },
  );

  return data;
};

export const uploadOrUpdateBrochureService = async ({
  link,
}: {
  link: string;
}): Promise<uploadOrUpdateBrochureResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/brochure`,
    {
      link,
    },
    { withCredentials: true },
  );

  return data;
};
