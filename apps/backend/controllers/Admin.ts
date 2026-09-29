import User from "../models/User";
import Notification from "../models/Notification";
import Team from "../models/Team";
import Brochure from "../models/Brochure";
import type { Request, Response } from "express";
import sendMail from "../utils/sendMail";

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate("members", "name email").exec();

    return res.status(200).json({
      success: true,
      teams,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching all teams",
    });
  }
};

export const getTeamDetailsAdmin = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId)
      .populate("members", "name email")
      .exec();

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    return res.status(200).json({
      success: true,
      team,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching team details",
    });
  }
};

export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await Team.find({
      "submission.submittedAt": { $exists: true },
    })
      .select("teamName collegeName submission")
      .populate("members", "name email")
      .exec();

    return res.status(200).json({
      success: true,
      submissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching submissions",
    });
  }
};

export const removeMemberFromTeam = async (req: Request, res: Response) => {
  try {
    const { teamId, userId } = req.params;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!team.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "User is not in team",
      });
    }

    if (team.members.length === 1) {
      await User.findByIdAndDelete(userId);
      await Team.findByIdAndDelete(teamId);

      return res.status(200).json({
        success: true,
        message: "User removed and team deleted(last member)",
      });
    }

    team.members = team.members.filter((memberId) => {
      return memberId.toString() !== userId.toString();
    });

    await team.save();

    const userDetails = await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User removed successfully",
      team,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while removing member from team",
    });
  }
};

export const sendNotification = async (req: Request, res: Response) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const notification = await Notification.create({ title, message });

    const users = await User.find({
      role: { $in: ["leader", "member"] },
    });

    const emails = users.map((user) => user.email);

    for (const email of emails) {
      await sendMail(
        email,
        `New Hackathon Notification: ${title}`,
        `
                    <h2>${title}</h2>
                    <p>${message}</p>
                    <br/>
                    <p>Best Regards,<br/><b>Hackathon Admin Team</b></p>
                `,
      );
    }

    return res.status(200).json({
      success: true,
      message: "Notification send successfully",
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending notification",
    });
  }
};

export const uploadOrUpdateBrochure = async (req: Request, res: Response) => {
  try {
    const { link } = req.body;

    if (!link) {
      return res.status(400).json({
        success: false,
        message: "Link is required",
      });
    }

    let brochure = await Brochure.findOne();

    if (brochure) {
      brochure.pdfUrl = link;
      brochure.uploadedAt = Date.now();
      await brochure.save();
      return res.status(200).json({
        success: true,
        message: "Brochure updated",
        brochure,
      });
    }

    brochure = await Brochure.create({ pdfUrl: link });
    return res.status(200).json({
      success: true,
      message: "Brochure uploaded successfully",
      brochure,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while uploading brochure",
    });
  }
};
