// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// MongoDB connection string
const uri = "mongodb+srv://A11GroupProject:rEM3e9nQ2on9Uq5t@cluster0.ppatp66.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Function to connect to the MongoDB database
const Database = () => {
    // Attempt to connect to MongoDB using the connection string
    mongoose.connect(uri) 
        .then(() => {
            console.log('Connected to MongoDB'); // Log a success message if connected
        })
        .catch((error) => {
            console.log('Error connecting to MongoDB'); // Log an error message if connection fails
            console.log(error); // Log the actual error for debugging purposes
        });
}

// Export the Database function to be used in other parts of the application
module.exports = Database;
