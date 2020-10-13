console.log("Blog API build v1.0...engage!");

const express = require("express");
var mongoose = require('mongoose');
const app = express();
const morgan = require("morgan");

// MongoDB Database Setup
var mongoDB = 'mongodb+srv://riefer02:legacy21@blog-api-prototype-1.u94fe.mongodb.net/blog-db-1?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (con)=>{
    console.log('Database connection successful');
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); //Get Connection Error Event

// Models and Schema
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  title: String,
  summary: String,
  topic: String,
});
var blogModel = mongoose.model('blog', blogSchema );

// Database Test
var blogInstanceTest = new blogModel({
    title: 'My third and final blog post',
    topic: 'music',
    summary: 'This project is about more data!'
})

blogInstanceTest.save(function (err,blogPost) {
    if (err) return handleError(err);
    console.log(blogPost);
  });

blogModel.find({}, 'title', (err, blogPosts)=>{
    if (err) return handleError(err);
    console.log(blogPosts)
})


let port = 6969;

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.json({
    message: "Hello from the groot boot!",
  });
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
