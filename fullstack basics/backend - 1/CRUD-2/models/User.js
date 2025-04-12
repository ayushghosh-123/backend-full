const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testappl', { // Corrected port and removed extra space
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('MongoDB connection error:', err); // Removed misplaced parenthesis
});

const userSchema = new mongoose.Schema({
    image: String,
    name: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);
