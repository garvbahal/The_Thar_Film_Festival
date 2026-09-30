export type myCredentialsType = {
  success: boolean;
  user: {
    id: string;
    role: "leader" | "admin" | "member";
  };
};

export type loginResponseType = {
  success: boolean;
  message: string;
};

export type requestOtpResponseType = {
  success: boolean;
  message: string;
};

export type requestOtpFormValues = {
  email: string;
  name: string;
  password: string;
  collegeName: string;
  teamCode?: string;
  teamName?: string;
  teamOption: "create" | "join";
};

export type verifyOtpResponse = {
  success: boolean;
  message: string;
};

export type logoutResponse = {
  success: boolean;
  message: string;
};
