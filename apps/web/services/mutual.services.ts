import axios from "axios";
import { getAllNotificationsResponse } from "../types/participant.types";

export const getAllNotificationsService =
  async (): Promise<getAllNotificationsResponse> => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getnotifications`,
      { withCredentials: true },
    );

    return data;
  };
