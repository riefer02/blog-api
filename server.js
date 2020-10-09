console.log("Blog API build v1.0...engage!");

const express = require("express");
const app = express();

let port = 6969;

app.get("/", (req, res) => {
  console.log(req);
  res.json({
    message: "Hello from the groot boot!",
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
