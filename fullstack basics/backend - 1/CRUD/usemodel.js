const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongopractice', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB successfully!"))
.catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
});

module.exports = mongoose.model('User', userSchema);


