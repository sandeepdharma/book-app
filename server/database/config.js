import mysql from "mysql2/promise";
import dotnev from "dotenv";
dotnev.config();

const database = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default database;
