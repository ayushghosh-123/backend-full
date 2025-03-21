const express = require('express')
const app = express()


// app.use((req, res , next) =>{
//     console.log('middleware challao ....')
//     next()
// });

// app.use((req, res , next) =>{
//     console.log('middleware challao aur ek bar ....')
//     next()
// });



// app.get("/about", (req, res) =>{
//     res.send("about chalao")
// })


// rotes create karna
app.get("/", (req, res, next) =>{
    // res.send("champion meraaaa annnnuj")
    return next(new Error("something went wrong"))
})

// error handler
app.use((err, req , res, next) =>{
    console.error(err.stack)
    res.status(500).send("something broke...")
})

// make the server
app.listen(3000)