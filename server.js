console.log("Blog API build v1.0...engage!");

const express = require("express");
var mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");

const blogModel = require("./models/Blog.js");

// MongoDB Database Setup
var mongoDB =
  "mongodb+srv://riefer02:legacy21@blog-api-prototype-1.u94fe.mongodb.net/blog-db-1?retryWrites=true&w=majority";
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (con) => {
    console.log("Database connection successful");
  }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:")); //Get Connection Error Event

let port = 6969;

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let blogs = await blogModel.find({}, "summary", (err, blogPosts) => {
    if (err) return handleError(err);
  });
  res.json({
    message: "Hello from the groot boot!",
    blogs,
  });
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
