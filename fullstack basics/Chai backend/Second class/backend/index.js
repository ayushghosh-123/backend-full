import express from 'express'

const app = express()
app.use(express.static('dist'))

// app.get("/", (req, res)=>{
//     res.send('Server is ready')
// })

app.get('/api/jokes', (req, res) => {
    const jokes = [
        { id: 1, joke: "Why did the scarecrow win an award? Because he was outstanding in his field!" },
        { id: 2, joke: "I told my wife she was drawing her eyebrows too high. She looked surprised." },
        { id: 3, joke: "Why don't skeletons fight each other? They don't have the guts." },
        { id: 4, joke: "What do you call fake spaghetti? An impasta!" },
        { id: 5, joke: "Why did the bicycle fall over? Because it was two-tired!" }
    ]
    res.send(jokes)
}
)

const port = 3000

app.listen(port, () =>{
    console.log(`server at http://localhost:${port}`)
})