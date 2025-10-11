const express = require("express");
const app = express();
const fs = require("fs");
const userModel = require("./models/user");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  await userModel.findOneAndDelete({_id: req.params.id});
  res.redirect("/read");
})

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let createdUser = await userModel.create({
    name,
    email,
    image,
  });
  res.redirect("/read");
});

app.listen("3000", () => {
  console.log("Server is running");
});
