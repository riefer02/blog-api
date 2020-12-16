console.log("Blog API build v1.0...engage!");
// require("dotenv").config({ path: "./config.env" });
const { MONGODB_PASSWORD, MONGODB_URI, NODE_ENV } = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// build modules
const history = require("connect-history-api-fallback");
const path = require("path");
const publicPath = path.resolve(__dirname, "./public");

// const blogModel = require("./models/Blog.js");
const blogRouter = require("./routes/blogRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

// MongoDB Database Setup
const database = MONGODB_URI.replace("<password>", MONGODB_PASSWORD);
mongoose.connect(
  database,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connection successful");
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

app.use(history()); // SPA Application Requirement

console.log(NODE_ENV)
console.log(publicPath)

if (NODE_ENV === "production") {
  app.use(express.static(publicPath));
  // app.get(/.*/, (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "./index.html"));
  // });
}

app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
