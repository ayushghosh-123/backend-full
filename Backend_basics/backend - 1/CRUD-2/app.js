const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const userModule = require('./models/User');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine (e.g., EJS, Pug, or another template engine)
app.set('view engine', 'ejs'); // Change 'ejs' to the appropriate template engine if needed



app.get('/user', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    try {
        let users = await userModule.find(); // Changed "user" to "users" for consistency
        res.render("read", { users }); // Pass "users" instead of "user"
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await userModule.findOneAndDelete({ _id: req.params.id }); // Fixed "__id" to "_id"
        res.redirect('/read'); // Removed incorrect second argument
    } catch (error) {
        res.status(500).send("Error deleting user");
    }
});

app.get('/edit/:id', async (req, res) => {
   let user = await userModule.findOne({_id: req.params.id}); // Fixed "__id" to "_id"
    res.render("edit", { user }); // Pass "user" to the template
});

app.post('/update/:userid', async (req, res) => {
    try {
        const { image, name, email } = req.body; // Destructuring for clarity
        console.log(image, name, email); // Log the values for debugging
        // Corrected the method and parameter: use findOneAndUpdate instead of findOne
        const user = await userModule.findOneAndUpdate(
            { _id: req.params.userid },          // Use the correct param name 'userid'
            { image, name, email },              // Fields to update
            { new: true }                        // Return the updated document
        );

        res.redirect("/read"); // Redirect after successful update
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/create', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        await userModule.create({ name, email, image });
        res.redirect('/read'); // Redirect to user list instead of sending JSON response
    } catch (error) {
        res.status(500).send("Error creating user");
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

