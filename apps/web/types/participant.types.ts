export type getTeamDetailsResponse = {
  success: boolean;
  team: {
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
      _id: string;
    }[];
  };
};

export type submitLinkResponse = {
  success: boolean;
  message: string;
  submission: {
    driveLink?: string | null;
    youtubeLink?: string | null;
    submittedAt?: Date | null;
  };
};

export type getAllNotificationsResponse = {
  success: boolean;
  message: string;
  notifications: {
    message: string;
    title: string;
    sendAt: Date;
  }[];
};
