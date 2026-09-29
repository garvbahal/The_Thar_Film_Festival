import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Team from "../models/Team";
import dotenv from "dotenv";
dotenv.config();
import sendMail from "../utils/sendMail";
import Otp from "../models/OTP";
import type { CookieOptions, Request, Response } from "express";

// exports.signUpLeader = async (req, res) => {
//     try {
//         const { name, email, password, collegeName, teamName } = req.body;

//         if (!name || !email || !password || !collegeName || !teamName) {
//             return res.status(404).json({
//                 success: false,
//                 message: "All fields are required!!",
//             });
//         }

//         const existingUser = await User.findOne({
//             email: email,
//         });

//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Account Already Registered!!",
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const teamCode =
//             "FF-" + Math.random().toString(36).substring(2, 8).toUpperCase();

//         const teamDetails = await Team.create({
//             teamName: teamName,
//             collegeName: collegeName,
//             uniqueCode: teamCode,
//             members: [],
//         });

//         const userDetails = await User.create({
//             name: name,
//             email: email,
//             passwordHashed: hashedPassword,
//             collegeName: collegeName,
//             role: "leader",
//             team: teamDetails._id,
//         });

//         teamDetails.members.push(userDetails._id);
//         await teamDetails.save();

//         await sendMail(
//             email,
//             "Registration Successful",
//             `
//                 <h2>Welcome to the Hackathon 🎉</h2>
//                 <p>Your registration is completed successfully.</p>
//                 <p><b>Your Team Name:</b> ${teamName}</p>
//                 <p><b>Your Team Code:</b> <span style="color:blue">${teamCode}</span></p>
//                 <br/>
//                 <p>Share this code with your teammates so they can join.</p>
//             `
//         );

//         const jwtToken = jwt.sign(
//             {
//                 id: userDetails._id,
//                 role: userDetails.role,
//             },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Leader Account Created Successfully!!",
//             jwtToken,
//             userDetails,
//             teamDetails,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: error.message,
//             message: "Something went wrong while signing as a leader!!",
//         });
//     }
// };

// exports.memberSignUp = async (req, res) => {
//     try {
//         const { name, email, password, collegeName, teamCode } = req.body;

//         if (!name || !email || !password || !collegeName || !teamCode) {
//             return res.status(404).json({
//                 success: false,
//                 message: "All fields are required!!",
//             });
//         }

//         const existingUser = await User.findOne({
//             email: email,
//         });

//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Account already existed of this email",
//             });
//         }

//         const teamDetails = await Team.findOne({
//             uniqueCode: teamCode,
//         });

//         if (!teamDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Invalid team code!!",
//             });
//         }

//         if (teamDetails.members.length >= 6) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Team is already full!! Maximum 6 members allowed!!",
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const userDetails = await User.create({
//             name: name,
//             email: email,
//             passwordHashed: hashedPassword,
//             team: teamDetails._id,
//             role: "member",
//             collegeName: collegeName,
//         });

//         teamDetails.members.push(userDetails._id);
//         await teamDetails.save();

//         await sendMail(
//             email,
//             "Team Joined Successfully",
//             `
//             <h2>Welcome to the Hackathon 🎉</h2>

//             <p>Your account has been created successfully and you have been added to a team.</p>

//             <p><b>Your Name:</b> ${name}</p>
//             <p><b>Team Name:</b> ${teamDetails.teamName}</p>
//             <p><b>Team Code:</b> <span style="color:blue;">${teamDetails.uniqueCode}</span></p>

//             <br/>
//             <p>If this was not you, please contact support immediately.</p>
//             <br/>
//             <p>Best wishes,<br/><b>Hackathon Admin Team</b></p>
//         `
//         );

//         const jwtToken = jwt.sign(
//             {
//                 id: userDetails._id,
//                 role: userDetails.role,
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "7d",
//             }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Member account created and added to team successfully!!",
//             token: jwtToken,
//             user: userDetails,
//             team: teamDetails,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while signing up as a member!!",
//             error: error.message,
//         });
//     }
// };

export const requestOTP = async (req: Request, res: Response) => {
  try {
    const { email, name, password, collegeName, teamName, teamCode } = req.body;

    if (!email || !name || !password || !collegeName) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!teamName && !teamCode) {
      return res.status(400).json({
        success: false,
        message: "Team name is required if you are creating a new team",
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpHash = await bcrypt.hash(otp, 10);

    await Otp.findOneAndUpdate(
      { email },
      {
        email,
        otpHash,
        data: req.body,
        expiresAt: Date.now() + 5 * 60 * 1000,
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
    const { name, email, password, collegeName, teamName, teamCode } =
      req.signupData;

    if (!name || !password || !collegeName) {
      return res.status(400).json({
        success: false,
        message: "Incomplete signup data",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account already registered!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userDetails;
    let teamDetails;

    // Member signup

    if (teamCode) {
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
        passwordHashed: hashedPassword,
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
    } else {
      // Leader signup
      if (!teamName) {
        return res.status(400).json({
          success: false,
          message: "Team name is required for leader signup",
        });
      }

      const uniqueCode =
        "FF-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      teamDetails = await Team.create({
        teamName,
        collegeName,
        uniqueCode,
        members: [],
      });

      userDetails = await User.create({
        name,
        email,
        passwordHashed: hashedPassword,
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
      user: userDetails,
      team: teamDetails,
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "All fields are requierd!!",
      });
    }

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

      userDetails.passwordHashed = undefined;
      userDetails.token = jwtToken;
      res.cookie("token", jwtToken, options).status(200).json({
        success: true,
        message: "Logged in successfully!!",
        userDetails,
        jwtToken,
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
