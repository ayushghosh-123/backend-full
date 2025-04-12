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

// Connect to MongoDB (ensure the correct connection string)
mongoose.connect('mongodb://127.0.0.1:27017/testappl', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

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

