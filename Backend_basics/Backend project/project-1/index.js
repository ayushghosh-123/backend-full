const express = require('express');
const Path = require('path');
const app = express();
const fs = require('node:fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(Path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render('index', {files: files});
    }); 
});

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8",(err, data) => {
        res.render('Show',{ filename: req.params.filename, data: data});
    });
});

app.get('/edit/:filename', (req, res) => {
   res.render('edit', {filename: req.params.filename});
});

app.post('/edit', (req, res) => {
        fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err) => {
            res.redirect("/");
        });
 });


app.post('/create', (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.detail,(err)=>{
        res.redirect("/");
    } )
})

app.listen(3000);