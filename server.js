console.log("Blog API build v1.0...engage!");
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

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
    console.log(con);
  }
);
var db = mongoose.connection;
mongoose.set("useFindAndModify", false);
db.on("error", console.error.bind(console, "MongoDB connection error:")); //Get Connection Error Event

let port = 6969 || process.env.PORT;

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true })); // Parse incoming requests
app.use(bodyParser.json());
app.use(cors());
app.use("/blog", blogRouter);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
