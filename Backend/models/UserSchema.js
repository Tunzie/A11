// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');
// Define the schema for the UserSchema collection
const UserSchema = new mongoose.Schema({
    email: {
        type: String, required: true, unique: 'Email already used!'
    },
    password: {
        type: String, required: true
    }
});

// Export the model based on the schema to be used in other parts of the application
module.exports = mongoose.model('a11users', UserSchema);