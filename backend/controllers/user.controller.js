import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
    try {
        const requesterUserId = req.user._id;

        const allUsers = await User.find({
            _id: { $ne: requesterUserId },
            deletedAt: null
        }, { password: 0 }).sort([['username', 1]]);

        return res.status(200).json(allUsers);

    } catch (error) {
        console.error('Error in getUsersForSidebar controller:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}