console.log("Blog API build v1.0...engage!");

const { MONGODB_PASSWORD, MONGODB_URI, NODE_ENV } = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const history = require("connect-history-api-fallback");

// build modules
const path = require("path");
const publicPath = path.resolve(__dirname, "./public");

// const blogModel = require("./models/Blog.js");
const blogRouter = require("./routes/blogRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

// MongoDB Database Setup
const database = MONGODB_URI.replace("<password>", MONGODB_PASSWORD);

mongoose.connect(
  database || process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connection successful");
  }
);
var db = mongoose.connection;
mongoose.set("useFindAndModify", false);
db.on("error", console.error.bind(console, "MongoDB connection error:")); //Get Connection Error Event

let port = process.env.PORT || 6969;
if (port === null || port === "") port = 6969;

if (NODE_ENV === "development") {
  app.use(morgan("combined"));
}

app.use(express.urlencoded({ extended: true })); // Parse incoming requests
app.use(bodyParser.json());
app.use(cors());

app.use(history()); // SPA Application Requirement
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-eval'"],
    },
  })
);

if (NODE_ENV === "production" || process.env.NODE_ENV === "production") {
  app.use(express.static(publicPath));
  app.get("/", function(req, res) {
    res.sendFile(publicPath + "/index.html");
  });
}

app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
