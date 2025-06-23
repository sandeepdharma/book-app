import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import database from "./database/config.js";

export const verifyEmail = async (email) => {
  const query = "SELECT * FROM members WHERE email = ?";
  const [rows] = await database.query(query, [email]);
  return rows.length > 0 ? rows[0] : undefined;
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.HIDDEN_CODE);
    req.user = decoded; // attach user info to req
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const loginerRole = req.cookies.member_role;
    console.log(loginerRole);
    if (!loginerRole || !allowedRoles.includes(loginerRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Role not authorized.",
      });
    }
    next();
  };
};
export default { verifyEmail, verifyToken, verifyRole };
