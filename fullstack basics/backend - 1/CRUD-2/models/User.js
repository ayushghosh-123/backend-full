const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:3000 /testappl',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});



