// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');
// Define the schema for the Contact collection
const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    },
    mail: {
        type: String, required: true
    },
    subject: {
        type: String, required: true
    },
    info: {
        type: String, required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, // Reference to the user who created the contact
        ref: 'a11users', // The collection that the ObjectId refers to
        required: true
    }
});
// Export the model based on the schema to be used in other parts of the application
module.exports = mongoose.model('a11contacts', ContactSchema);