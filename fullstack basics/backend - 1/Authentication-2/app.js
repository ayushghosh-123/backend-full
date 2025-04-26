const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require("./models/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/create', async (req, res) => {
    try {
        const { username, email, password, age } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            age
        });

        let token = jwt.sign({email}, "sssssshssss")
        res.cookie("token", token)

        res.send(createdUser);
    } catch (err) {
        res.status(500).send("Error creating user: " + err.message);
    }
});

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login', async(req, res)=> {
    let user = await userModel.findOne({email: req.body.email})
    if(!user)
        { 
            return res.send("something is wrong")
        }
    bcrypt.compare(req.body.password, user.password, (err, result) =>{
        if(result){
            let token = jwt.sign({email}, "sssssshssss")
            res.cookie("token", token)
            res.send("you login in the game")
        }
        res.send("you cannnot login my child")
    } )    

})

app.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,   // set to true if using HTTPS
        sameSite: "strict"
    });
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
