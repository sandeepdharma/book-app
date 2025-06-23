import express from "express";
import dotenv from "dotenv";
import database from "../database/config.js";
dotenv.config();
const route = express.Router();

route.post("/add-publishers", async (req, res, next) => {
  const { publisher_name, location } = req.body;
  const member_id = req.cookies.member_id;
  console.log(member_id);
  try {
    const query =
      "INSERT INTO publishers(member_id, publisher_name, location) VALUES (?, ? , ?)";
    const values = [member_id, publisher_name, location];
    const [publisher] = await database.query(query, values);
    res
      .status(200)
      .json({ success: true, message: "New Publisher Added", data: publisher });
  } catch (error) {
    next(error);
  }
});

route.get("/get-publishers", async (req, res, next) => {
  try {
    const [publishers] = await database.query("SELECT * FROM publishers");
    if (publishers.length === 0) {
      res.status(200).json({
        success: true,
        message: "Publishers list Empty",
        data: publishers,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Publishers list Success",
        data: publishers,
      });
    }
  } catch (error) {
    next(error);
  }
});

route.post("/add-authors", async (req, res, next) => {
  const { author_name, gender, bio } = req.body;
  const member_id = req.cookies.member_id;
  try {
    let query =
      "INSERT INTO authors (member_id, author_name,gender,bio) VALUES (?,?,?,?)";
    let values = [member_id, author_name, gender, bio];
    const [author] = await database.query(query, values);
    res.status(201).json({ success: true, message: "Author Added Success" });
  } catch (error) {
    next(error);
  }
});

route.get("/get-authors", async (req, res, next) => {
  try {
    const [authors] = await database.query("SELECT * FROM authors");
    if (authors.length === 0) {
      res.status(200).json({
        success: true,
        message: "authors list Empty",
        data: authors,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "authors list Success",
        data: authors,
      });
    }
  } catch (error) {
    next(error);
  }
});

route.post("/add-librarians", async (req, res, next) => {
  const { librarian_name } = req.body;
  const member_id = req.cookies.member_id;
  try {
    let query =
      "INSERT INTO librarians (member_id, librarian_name) VALUES (?,?)";
    let values = [member_id, librarian_name];
    const [librarian] = await database.query(query, values);
    res.status(201).json({
      success: true,
      message: "Librarian Added Success",
      data: librarian,
    });
  } catch (error) {
    next(error);
  }
});

route.get("/get-librarians", async (req, res, next) => {
  try {
    const [librarians] = await database.query("SELECT * FROM librarians");
    if (librarians.length === 0) {
      res.status(200).json({
        success: true,
        message: "librarians list Empty",
        data: librarians,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "librarians list Success",
        data: librarians,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default route;
