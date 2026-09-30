import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Team from "../models/Team";
import dotenv from "dotenv";
dotenv.config();
import sendMail from "../utils/sendMail";
import Otp from "../models/OTP";
import type { CookieOptions, Request, Response } from "express";
import {
  loginSchema,
  requestOtpSchema,
  signupSchema,
} from "../schemas/auth.schema";

const getUniqueCode = (): string => {
  const uniqueCode: string =
    "FF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  return uniqueCode;
};

export const requestOTP = async (req: Request, res: Response) => {
  try {
    const { success, error, data } = requestOtpSchema.safeParse(req.body);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Invalid required Credentials",
      });
    }

    const {
      name,
      email,
      collegeName,
      password,
      teamCode,
      teamName,
      teamOption,
    } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpHash = await bcrypt.hash(otp, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    await Otp.findOneAndUpdate(
      { email },
      {
        email,
        otpHash,
        data: {
          email,
          password: hashedPassword,
          collegeName,
          teamCode,
          teamName,
          teamOption,
          name,
        },
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      { upsert: true },
    );

    await sendMail(
      email,
      "Verify your email",
      `
            <h2>Email Verification</h2>
            <p>Your OTP is <b>${otp}</b></p>
            <p>This OTP is valid for 5 minutes.</p>
            `,
    );

    return res.status(200).json({
      success: true,
      message: "OTP send successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while requesting otp",
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { success, error, data } = signupSchema.safeParse(req.body);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const { email, otp } = data;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account already registered!",
      });
    }

    const details = await Otp.findOne({
      email,
      expiresAt: { $gt: new Date() },
    });

    if (!details) {
      return res.status(400).json({
        success: false,
        message: "No OTP Found Go to signup page first",
      });
    }

    if (!(await bcrypt.compare(otp, details.otpHash))) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const { password, collegeName, teamCode, teamName, name, teamOption } =
      details.data;

    let userDetails;
    let teamDetails;

    // Member signup

    if (teamOption === "join") {
      teamDetails = await Team.findOne({ uniqueCode: teamCode });

      if (!teamDetails) {
        return res.status(404).json({
          success: false,
          message: "Invalid team Code",
        });
      }

      if (teamDetails.members.length >= 6) {
        return res.status(403).json({
          success: false,
          message: "Team is already full(max 6 members needed)",
        });
      }

      userDetails = await User.create({
        name,
        email,
        passwordHashed: password,
        collegeName,
        role: "member",
        team: teamDetails._id,
      });

      teamDetails.members.push(userDetails._id);
      await teamDetails.save();

      await sendMail(
        email,
        "Team Joined Successfully",
        `
                <h2>Welcome to the Hackathon 🎉</h2>
                <p>You have successfully joined a team.</p>
                <p><b>Team Name:</b> ${teamDetails.teamName}</p>
                <p><b>Team Code:</b> ${teamDetails.uniqueCode}</p>
                `,
      );
    } else if (teamOption === "create") {
      // Leader signup
      if (!teamName) {
        return res.status(400).json({
          success: false,
          message: "Team name is required for leader signup",
        });
      }

      let uniqueCode: string | undefined = undefined;

      let creation: boolean = false;

      for (let i = 0; i < 1000; i++) {
        uniqueCode = getUniqueCode();

        if (!(await Team.findOne({ uniqueCode }))) {
          creation = true;
          break;
        }
      }

      if (!creation) {
        return res.status(400).json({
          success: false,
          message: "Unable to create Team... Try after Few Minutes",
        });
      }

      teamDetails = await Team.create({
        teamName,
        collegeName,
        uniqueCode,
        members: [],
      });

      userDetails = await User.create({
        name,
        email,
        passwordHashed: password,
        collegeName,
        role: "leader",
        team: teamDetails._id,
      });

      teamDetails.members.push(userDetails._id);
      await teamDetails.save();

      await sendMail(
        email,
        "Registration Successful",
        `
                <h2>Welcome to the Hackathon 🎉</h2>
                <p>You have successfully created a team.</p>
                <p><b>Team Name:</b> ${teamName}</p>
                <p><b>Team Code:</b> ${uniqueCode}</p>
                `,
      );
    }

    return res.status(200).json({
      success: true,
      message: "signup successfull",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while signing up",
    });
  }
};

// login
export const login = async (req: Request, res: Response) => {
  try {
    const { success, error, data } = loginSchema.safeParse(req.body);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const { email, password } = data;

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not registered, please signup first!!",
      });
    }

    if (await bcrypt.compare(password, userDetails.passwordHashed)) {
      const payload = {
        id: userDetails._id,
        role: userDetails.role,
      };
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("Jwt secret is missing");
      }
      const jwtToken = jwt.sign(payload, jwtSecret, {
        expiresIn: "7d",
      });

      const options: CookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      return res.cookie("token", jwtToken, options).status(200).json({
        success: true,
        message: "Logged in successfully!!",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging up!!",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  return res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};
