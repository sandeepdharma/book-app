import express from "express";
import dotenv from "dotenv";
import database from "../database/config.js";
import { verifyRole, verifyToken } from "../utilities.js";
dotenv.config();
import { StatusCodes, ReasonPhrases } from "http-status-codes";
const route = express.Router();
import {
  booksByAuthor,
  booksByLibrarian,
  booksByPublsiher,
  getBooksById,
  getBooksQuery,
  insertNewBook,
  universal_search,
} from "../queries/book.quries.js";

route.post(
  "/add-books",
  verifyToken,
  verifyRole(["librarian", "admin", "super_admin"]),
  async (req, res, next) => {
    const {
      book_title,
      book_description,
      book_image,
      createdAt,
      publisher_id,
      author_id,
      librarian_id,
    } = req.body;
    const book_values = [
      book_title,
      book_description,
      book_image,
      createdAt,
      publisher_id,
      author_id,
      librarian_id,
    ];
    try {
      const [insertResult] = await database.query(insertNewBook, book_values);
      const [result] = await database.query(
        getBooksById,
        insertResult.insertId,
      );
      res.status(201).json({
        success: true,
        message: "New Book Entry Completed",
        data: result,
      });
      //   const insertedId = insertResult.insertId;
      //   let getQuery = getBooksQuery;
      //   let values = [insertedId];
      //   let [payload] = await database.query(getQuery, values);
      //   res.status(201).json({
      //     success: true,
      //     message: "New Book Entry Completed",
      //     data: payload,
      //   });
    } catch (error) {
      next(error);
    }
  },
);

route.get(
  "/get-books",
  verifyToken,
  verifyRole(["librarian", "admin", "super_admin"]),
  async (req, res, next) => {
    try {
      const [books] = await database.query("SELECT * FROM books");
      console.log(books);
      if (!books || books.length === 0)
        return res.status(StatusCodes.NO_CONTENT).json({
          success: false,
          message: ReasonPhrases.NO_CONTENT,
          data: books,
        });
      res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: "Books List Print Success",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },
);

//  Books by pusblishers
route.get("/get-books-by-publishers", async (req, res, next) => {
  const { publisher_id } = req.body;
  try {
    const [books] = await database.query(booksByPublsiher, [publisher_id]);
    if (!books || books.length === 0)
      return res.status(401).json({
        success: false,
        message: `books by publisher empty`,
        data: books,
      });
    res.status(200).json({
      success: true,
      message: `books by publisher print success`,
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

//  Books by Librarian
route.get("/get-books-by-librarians", async (req, res, next) => {
  const { librarian_id } = req.body;
  try {
    const [books] = await database.query(booksByLibrarian, [librarian_id]);
    if (!books || books.length === 0)
      return res.status(401).json({
        success: false,
        message: `books by librarian empty`,
        data: books,
      });
    res.status(200).json({
      success: true,
      message: `books by librarian print success`,
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

//  Books by Authors
route.get("/get-books-by-authors", async (req, res, next) => {
  const { author_id } = req.body;
  try {
    const [books] = await database.query(booksByAuthor, [author_id]);
    if (!books || books.length === 0)
      return res.status(401).json({
        success: false,
        message: `books by author empty`,
        data: books,
      });
    res.status(200).json({
      success: true,
      message: `books by author print success`,
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

route.get("/search", async (req, res, next) => {
  let { searchText, limit, offset } = req.query;
  searchText = searchText || "";
  limit = limit || 10;
  offset = offset || 0;
  try {
    const [books] = await database.query(universal_search, [
      searchText,
      searchText,
      searchText,
      limit,
      offset,
    ]);
    if (!books || books.length === 0)
      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: "No Content found" });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Books printed Success", data: books });
  } catch (error) {
    next(error);
  }
});

export default route;
