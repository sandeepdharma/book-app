import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
import cookieParser from "cookie-parser";
app.use(cookieParser());
import dotenv from "dotenv";
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
import { errorHandler } from "./middleware/errorhandler.js";
import authRoutes from "./routes/auth.route.js";
import usersRoutes from "./routes/users.route.js";
import booksRoutes from "./routes/books.route.js";

app.listen(process.env.PORT, () => {
  console.log(`Server Listening at ${process.env.PORT}`);
});

app.use("/api/v1/books", authRoutes);
app.use("/api/v1/books", usersRoutes);
app.use("/api/v1/books", booksRoutes);
app.use(errorHandler);
