const mongoose = require('mongoose');
const uri = "mongodb+srv://A11GroupProject:rEM3e9nQ2on9Uq5t@cluster0.ppatp66.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const Database = () => {
    mongoose.connect(uri)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.log('Error connecting to MongoDB');
            console.log(error);
        });
}

module.exports = Database;