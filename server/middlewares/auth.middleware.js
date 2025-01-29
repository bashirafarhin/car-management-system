import UserModel from "../database/models/user.model.js";
import BlacklistTokenModel from "../database/models/blacklistToken.model.js";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const authMiddleware = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(400).json({ message : "Unauthorized"});
    }
    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if(isBlacklisted){
        return res.status(400).json({ message : "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong." });
    }
}