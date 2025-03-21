const express = require('express');
const Path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, 'public')));

// i am using ejs template engine
app.set('view engine', 'ejs');

// dynamic Routing
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/profile/:username", (req, res) => {
  res.send(`welcome ${req.params.username}`);
});

app.get("/profile/:username/:age", (req, res) => {
  // res.send(`welcome ${req.params.username} your age is ${req.params.age}`);
  res.send(req.params);
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// console.log(__dirname+'/public');

