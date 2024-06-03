import { compare } from 'bcrypt';
import { User } from '../models/user.js';
import { sendToken } from '../utils/features.js';

const newUser = async (req, res) => {
    try {
        const { name, username, password, bio } = req.body;
        const avatar = {
            public_id: "sfs",
            url: "dvff",
        };
        const user = await User.create({ name, bio, username, password, avatar });
        sendToken(res, user, 201, "User Created");
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).select("+password");
        if (!user) return res.status(400).json({ message: "Invalid Username" });

        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

        sendToken(res, user, 201, `Welcome Back, ${user.name}`);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export { login, newUser };
