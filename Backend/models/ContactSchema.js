const mongoose = require('mongoose');

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'a11users',
        required: true
    }
});

module.exports = mongoose.model('a11contacts', ContactSchema);