const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
//using uuid
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "ejs"); //setting ejs
app.set("views", path.join(__dirname, "views")); //setting views folder path
app.use(express.static(path.join(__dirname, "public"))); //setting public
app.use(express.urlencoded({ extended: true })); //encoding json file

let posts = [
  {
    id: uuidv4(),
    username: "Ana",
    content: " i love college",
  },
  {
    id: uuidv4(),
    username: "ayan javed",
    content: " i love dreaming",
  },
  {
    id: uuidv4(),
    username: "sidra",
    content: " i love coding",
  },
];
// To get all The Posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
//TO add a new Post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});
// getting more info of post
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});
//update
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});
//delete
app.delete("/post/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
app.listen(port, () => {
  console.log(`listening to port : ${port}`);
});
