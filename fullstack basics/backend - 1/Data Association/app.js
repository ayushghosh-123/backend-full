const express = require('express');
const app = express();
const userModel = require("./Models/user");
const postModel = require("./Models/post");

// Add body parser middleware to parse JSON requests
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hey");
});

app.get("/create", async(req, res) => {
    try {
        let user = await userModel.create({
            username: "harsh",
            age: 25,
            email: "ayush@gmail.com" 
        });
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

app.get("/post/create", async (req, res) => {
    try {
        // Create the post
        let post = await postModel.create({
            postdata: "hello dost kaisa ho",
            user: "6811048ed484da46c778b39c",
        });
        
        // Find the user and update their posts array
        let user = await userModel.findOne({ _id: "6811048ed484da46c778b39c" });
        
        // Make sure user exists
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        // Initialize posts array if it doesn't exist
        if (!user.posts) {
            user.posts = [];
        }
        
        // Add the post ID to the user's posts array
        user.posts.push(post._id);
        
        // Save the updated user
        await user.save();
        
        // Send both post and user in the response
        res.send({ post, user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});