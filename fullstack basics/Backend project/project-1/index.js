const express = require('express');
const Path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(Path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000);