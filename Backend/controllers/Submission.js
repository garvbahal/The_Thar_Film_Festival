const User = require("../models/User");
const Team = require("../models/Team");

exports.getTeamDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        const teamId = user.team;

        const team = await Team.findById(teamId)
            .populate("members", "name email")
            .populate("leader", "name email")
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
            error: error.message,
        });
    }
};

exports.submitLink = async (req, res) => {
    try {
        const { driveLink, youtubeLink } = req.body;
        if (!driveLink && !youtubeLink) {
            return res.status(400).json({
                success: false,
                message:
                    "Please provide at least a Google Drive link or a YouTube link.",
            });
        }

        const userId = req.user.id;
        const user = await User.findById(userId);
        const teamId = user.team;

        const team = await Team.findById(teamId);

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
                `
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
            error: error.message,
        });
    }
};
