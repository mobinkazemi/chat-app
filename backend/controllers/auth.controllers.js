import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateJsonWebToken from '../utils/generateJWT.js';

export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Password don't match" })
        }
        const duplicateUsername = await User.findOne({ username })

        if (duplicateUsername) {
            return res.status(400).json({ error: "Username already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const profilePic = `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${username}`;

        const result = await User.create({
            fullName, username, password: hashedPassword, gender, profilePic
        });

        if (result) {
            generateJsonWebToken({ _id: result._id }, res);
            return res.status(201).json({
                _id: result._id,
                fullName,
                username,
                gender,
                profilePic
            });
        } else { return res.status(400).json({ error: "Invalid data" }) }
    } catch (error) {
        console.error('Error in register controller:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(400).json({ error: "username or password is invalid" })
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(400).json({ error: "username or password is invalid" })
        }

        generateJsonWebToken({ _id: user._id }, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.error('Error in login controller:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        return res.status(200).json({ message: "logged out successfully" })
    } catch (error) {
        console.error('Error in logout controller:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}