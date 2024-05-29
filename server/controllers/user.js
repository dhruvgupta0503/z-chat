import { User } from '../models/user.js';

const newUser = async (req, res) => {
const {name,username,password,bio}=req.body;
       

    try {
        const avatar = {
            public_id: "sfs",
            url: "dvff",
        };
       await User.create({ name,bio, username, password, avatar });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const login = (req, res) => {
    res.send("Server running");
};

export { login, newUser };
