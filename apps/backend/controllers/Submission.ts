import User from "../models/User";
import Team from "../models/Team";
import type { Request, Response } from "express";
import sendMail from "../utils/sendMail";
import { submitLinkSchema } from "../schemas/submission.schema";

export const getTeamDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exists",
      });
    }

    const teamId = user.team._id;

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
      message: "Something went wrong while getting team Details",
    });
  }
};

export const submitLink = async (req: Request, res: Response) => {
  try {
    const { success, error, data } = submitLinkSchema.safeParse(req.body);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: "At least One Link is required",
      });
    }

    const { youtubeLink, driveLink } = data;

    const userId = req.user!.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    const teamId = user.team._id;

    const team = await Team.findById(teamId).populate("members").exec();

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    team.submission = {
      driveLink: driveLink,
      youtubeLink: youtubeLink,
      submittedAt: new Date(),
    };

    await team.save();

    // 📩 Email all team members

    for (const member of team.members) {
      await sendMail(
        //@ts-ignore
        member.email,
        "Project Submission Successful",
        `
                    <h2>Submission Received 🎉</h2>

                    <p>Your team <b>${
                      team.teamName
                    }</b> has successfully submitted the project.</p>

                    <h3>Submitted Links:</h3>
                    <p><b>Drive Link:</b> ${driveLink || "Not provided"}</p>
                    <p><b>YouTube Link:</b> ${youtubeLink || "Not provided"}</p>

                    <p><b>Submission Time:</b> ${new Date().toLocaleString()}</p>

                    <br/>
                    <p>Best of luck for the evaluation! 🚀</p>
                    <p><b>Hackathon Admin Team</b></p>
                `,
      );
    }

    res.status(200).json({
      success: true,
      message: "Submission uploaded successfully",
      submission: team.submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while uploading submit link",
    });
  }
};
