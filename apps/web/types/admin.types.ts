type Team = {
  collegeName: string;
  teamName: string;
  uniqueCode: string;
  submission: {
    driveLink?: string | null;
    youtubeLink?: string | null;
    submittedAt?: Date | null;
  };
  createdAt: string;
  members: {
    name: string;
    email: string;
  }[];
};

export type getAllTeamsResponse = {
  success: boolean;
  teams: Team[];
};

export type getTeamDetailsResponse = {
  success: boolean;
  team: Team;
};

export type getAllSubmissionsResponse = {
  success: boolean;
  submissions: {
    teamName: string;
    collegeName: string;
    submission: {
      driveLink?: string | null;
      youtubeLink?: string | null;
      submittedAt?: Date | null;
    };
    members: {
      name: string;
      email: string;
    }[];
  }[];
};

export type removeMemberFromTeamResponse = {
  success: boolean;
  message: string;
};

export type sendNotificationResponse = {
  success: boolean;
  message: string;
  notification: {
    message: string;
    title: string;
    sendAt: Date;
  };
};

export type uploadOrUpdateBrochureResponse = {
  success: boolean;
  message: string;
  brochure: {
    pdfUrl: string;
    uploadedAt: Date;
  };
};
