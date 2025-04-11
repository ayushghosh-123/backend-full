const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine (e.g., EJS, Pug, or another template engine)
app.set('view engine', 'ejs'); // Change 'ejs' to the appropriate template engine if needed

app.get('/user', (req, res) => {
    res.render("index");
});

app.get('/read', (req, res) => {
    res.render("read");
});

app.post('/user', (req, res) => {
    res.render("read");
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
