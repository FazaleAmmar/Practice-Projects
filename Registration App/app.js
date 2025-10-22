const express = require("express");
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  if (req.cookies.token) res.redirect("/profile");
  else res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");
  res.render("profile", { user });
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  if (post.likes.includes(req.user.id)) {
    post.likes.splice(post.likes.indexOf(req.user.id), 1);
  } else {
    post.likes.push(req.user.id);
  }

  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findById(req.params.id);
  res.render("edit", { post });
});

app.get("/delete/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findByIdAndDelete(req.params.id);
  res.redirect("/profile");
});

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;

  let post = await postModel.create({
    user: user._id,
    content,
  });

  user.posts.push(post._id);
  user.save();

  res.redirect("/profile");
});

app.post("/register", async (req, res) => {
  let { name, username, email, password, age } = req.body;

  const user = await userModel.findOne({ email });
  if (user) return res.status(500).send("Something went wrong");

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let user = await userModel.create({
        name,
        username,
        email,
        age,
        password: hash,
      });

      let token = jwt.sign({ email: email, id: user._id }, "shhhhhhhh");

      res.cookie("token", token);
      res.redirect("/login");
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Something went wrong");

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: email, id: user._id }, "shhhhhhhh");
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      res.send("Something went wrong");
    }
  });
});

app.post("/update/:id", isLoggedIn, async(req, res) => {
  let { newcontent } = req.body;
  let post = await postModel.findById(req.params.id);
  post.content = newcontent;
  await post.save();
  res.redirect("/profile");
})

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.send("You are not logged in");
  else {
    let data = jwt.verify(req.cookies.token, "shhhhhhhh");
    req.user = data;
    next();
  }
}

app.listen(3000);
