const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extende: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("signin");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//signup page

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("Please try a different username");
  } else {
    let rounds = 10;
    const hashed = await bcrypt.hash(data.password, rounds);
    data.password = hashed;

    const userdata = await collection.insertMany(data);
		res.render("signin");
    console.log(userdata);
  }
});

//sign in page
app.post("/signin", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });

    if (!check) {
      res.send("username cannot be found!");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );

    if (passwordMatch) {
      res.render("home");
    } else {
      res.send("wrong password!");
    }
  } catch {
    res.send("Wrong details!");
  }
});

const port = 8000;
app.listen(port, () => {
  console.log("Server running on port 8000...");
});
