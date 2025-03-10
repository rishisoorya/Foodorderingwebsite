import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createToken = (user) => {
    try {
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET, 
            { expiresIn: "2h" } 
        );

        return token;
    } catch (error) {
        console.error("Error creating token:", error);
        return null; 
    }
};
