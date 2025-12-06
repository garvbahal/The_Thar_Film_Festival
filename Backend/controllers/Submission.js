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
