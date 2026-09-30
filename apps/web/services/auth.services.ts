import axios from "axios";
import toast from "react-hot-toast";
import {
  loginResponseType,
  myCredentialsType,
  requestOtpFormValues,
  requestOtpResponseType,
  verifyOtpResponse,
} from "../types/auth.types";

export const getMyAuth = async (): Promise<myCredentialsType> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/me`,
    {
      withCredentials: true,
    },
  );

  return data;
};

export const loginAuth = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<loginResponseType> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
    { email, password },
    { withCredentials: true },
  );

  return data;
};

export const requestOtpSevice = async ({
  name,
  email,
  collegeName,
  password,
  teamCode,
  teamName,
  teamOption,
}: requestOtpFormValues): Promise<requestOtpResponseType> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/signup/request_otp`,
    {
      name,
      email,
      collegeName,
      password,
      teamCode,
      teamName,
      teamOption,
    },
    {
      withCredentials: true,
    },
  );
  return data;
};

export const verifyOtpService = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<verifyOtpResponse> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/signup/verifyOtp`,
    { email, otp },
    { withCredentials: true },
  );
  return data;
};
