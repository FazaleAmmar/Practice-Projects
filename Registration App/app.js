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
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findById(req.user.id);
  res.send("Welcome back " + user.username);
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

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.send("You are not logged in");
  else {
    let data = jwt.verify(req.cookies.token, "shhhhhhhh");
    req.user = data;
    next();
  }
}

app.listen(3000);
