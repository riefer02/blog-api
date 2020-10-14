console.log("Blog API build v1.0...engage!");
require("dotenv").config({ path: "./config.env" });
const express = require("express");
var mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");

// const blogModel = require("./models/Blog.js");
const blogRouter = require("./routes/blogRoutes");

// MongoDB Database Setup
const database = process.env.MONGODB_URI.replace(
  "<password>",
  process.env.MONGODB_PASSWORD
);
mongoose.connect(
  database,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (con) => {
    console.log("Database connection successful");
  }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:")); //Get Connection Error Event

let port = 6969;

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true })); // Parse incoming requests

app.use("/blog", blogRouter);

// app.get("/", async (req, res) => {
//   let blogs = await blogModel.find({}, "summary", (err, blogPosts) => {
//     if (err) return handleError(err);
//   });
//   res.json({
//     message: "Hello from the groot boot!",
//     blogs,
//   });
// });

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
