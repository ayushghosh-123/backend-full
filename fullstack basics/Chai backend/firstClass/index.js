require('dotenv').config()
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000  // Fallback in case .env is missing or PORT is not defined

 const github = "i am your github"
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twiter', (req, res) => {
  res.send("ayushdotcom")
})

app.get('/login', (req, res) => {
  res.send('<h1> Please login at chai aur code </h1>')
})

app.get('/youtube', (req, res) => {
  res.send("<h2>Chai aur code </h2>")
})

app.get('/github', (req, res)=>{
    res.json(github)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
