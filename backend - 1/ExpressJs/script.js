const express = require('express')
const app = express()

// rotes create karna
app.get("/", (req, res) =>{
    res.send("champion meraaaa annnnuj")
})
app.get("/Profile", (req, res) =>{
    res.send("champian uskaaaa coaaaach")
})


// make the server
app.listen(3000)