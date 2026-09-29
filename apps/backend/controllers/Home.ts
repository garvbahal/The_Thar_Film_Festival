import Notification from "../models/Notification";
import Brochure from "../models/Brochure";
import type { Request, Response } from "express";

export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find().sort({ sendAt: -1 }).exec();

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching notifications",
    });
  }
};

export const getBrochure = async (req: Request, res: Response) => {
  try {
    const brochure = await Brochure.findOne();

    if (!brochure) {
      return res.status(404).json({
        success: false,
        message: "Brochure not found",
      });
    }

    return res.status(200).json({
      success: true,
      brochure,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching brochure",
    });
  }
};
