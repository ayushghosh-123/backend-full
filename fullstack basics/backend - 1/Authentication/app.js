const express = require ('express');
const cookieParser = require('cookie-parser');
const app = express()
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cookieParser())

/* This code snippet is setting up a route in the Express application for a GET request to the root URL
("/"). When a request is made to this route, it uses the bcrypt library to generate a salt with a
cost factor of 10. Then, it hashes the string "popopoopoopp" using the generated salt and logs the
salt value to the console. This process is used for securely hashing passwords before storing them
in a database. */


// app.get('/', (req, res) => {
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash("popopoopoopp", salt, function(err, hash) {
//             console.log(salt)
//         });
//     });
// })

// app.get('/', (req, res) => {
//     bcrypt.compare("popopoopoopp", "$2b$10$SWr.3DYDvObroWEN.vqZce", function(err, result) {
//         console.log(result) // true
//     });
// })


app.get("/", (req, res) => {
    let token = jwt.sign({email: "ayush@example.com"}, "secret");
    res.cookie("token", token)
    res.send("cookie set")
})

app.get('/read', (req, res) => {
   let data =  jwt.verify(req.cookies.token, "secret") 
   console.log(data)                                       // This will now log cookies correctly
    res.send("Reading cookies");
}); 




// app.get('/read', (req, res) => {
//     // console.log(req.cookies)
//     res.send('reading page')
// })

app.listen(3000)