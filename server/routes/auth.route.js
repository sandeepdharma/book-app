import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const route = express.Router();
import cookieParser from "cookie-parser";
import { verifyEmail } from "../utilities.js";
import {
  forgotPasswordQuery,
  getAllMembersQuery,
  resetPasswordQuery,
  signUpQuery,
} from "../queries/auth.quries.js";
import database from "../database/config.js";

route.get("/all-users", async (req, res, next) => {
  try {
    const [allusers] = await database.query(getAllMembersQuery);
    return res
      .status(201)
      .json({ success: true, message: "SignUp Success", data: allusers });
  } catch (error) {
    next(error);
  }
});

route.post("/signup", async (req, res, next) => {
  const { member_name, email, password, role } = req.body;
  try {
    let isExistingUser = await verifyEmail(email);
    if (isExistingUser)
      return res
        .status(401)
        .json({ success: false, message: "Existing User! Please Login" });
    let hashedPassword = await bcrypt.hash(password, 10);

    let values = [member_name, email, hashedPassword, role];
    const newMember = await database.query(signUpQuery, values);
    res
      .status(201)
      .json({ success: true, message: "SignUp Success", data: newMember });
  } catch (error) {
    next(error);
  }
});

route.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let isExistingUser = await verifyEmail(email);
    if (!isExistingUser)
      return res
        .status(401)
        .json({ success: false, message: "User Not Found! Please SignUp" });

    const validatePassword = await bcrypt.compare(
      password,
      isExistingUser.password,
    );
    if (!validatePassword)
      return res
        .status(401)
        .json({ success: false, message: "Wrong Password" });

    const token = jwt.sign(
      { userId: isExistingUser.id, role: isExistingUser.role },
      process.env.HIDDEN_CODE,
      { expiresIn: "24h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.cookie("member_id", isExistingUser.id, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.cookie("member_role", isExistingUser.role, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res
      .status(200)
      .json({ success: true, message: "Login Success", token: token });
  } catch (error) {
    next(error);
  }
});

route.post("/forgot-password", async (req, res, next) => {
  const { email } = req.body;
  try {
    const isExistingUser = await verifyEmail(email);
    if (!isExistingUser)
      return res.status(400).json({
        success: false,
        message: "Memebr Details Not found !, Please SignUp",
      });

    const resetPassword = jwt.sign(
      {
        userId: isExistingUser.role,
      },
      process.env.HIDDEN_CODE,
      { expiresIn: "15m" },
    );
    res.cookie("resetPassword", resetPassword, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    const resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    let values = [resetPassword, resetPasswordExpiresAt, isExistingUser.id];
    await database.query(forgotPasswordQuery, values);
    res.status(200).json({
      success: true,
      message: "Reeset Token Sent To API",
      resetToken: resetPassword,
    });
  } catch (error) {
    next(error);
  }
});

route.post("/reset-password", async (req, res, next) => {
  const { email, resetPassword, newPassword } = req.body;
  try {
    const isExistingUser = await verifyEmail(email);
    if (!isExistingUser)
      return res.status(400).json({
        success: false,
        message: "Memebr Details Not found !, Please SignUp",
      });
    console.log(isExistingUser);
    if (resetPassword !== isExistingUser.resetPassword)
      return res.status(400).json({
        success: false,
        message: "Reset Token didn't match",
      });
    const hashedNewPass = await bcrypt.hash(newPassword, 10);
    const values = [hashedNewPass, null, null, isExistingUser.id];
    await database.query(resetPasswordQuery, values);
    res.status(200).json({
      success: true,
      message: "Reset Password Success, Please Login with New Password",
    });
  } catch (error) {
    next(error);
  }
});

export default route;
