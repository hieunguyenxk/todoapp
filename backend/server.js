require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const tasksRoute = require("./routes/tasks");

mongoose
  .connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected"))
  .catch(() => console.log("Not connected"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan());

app.use(tasksRoute);

app.listen(5000, console.log("Running on 5000"));
