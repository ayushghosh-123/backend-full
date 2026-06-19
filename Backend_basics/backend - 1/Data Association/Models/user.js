const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testappl', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected...');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});


// Defined schema with proper naming convention (lowercase 'posts')
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

module.exports = mongoose.model('User', userSchema);

