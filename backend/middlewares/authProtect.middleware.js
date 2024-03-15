import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

const authProtect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ error: "Auth error - Invalid token" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Auth error - Invalid token" })
        }

        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(decoded._id),
            deletedAt: null
        }, {
            password: 0
        });

        if (!user) {
            return res.status(404).json({ error: "Auth error - user not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Error in authProtect middleware:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export default authProtect;