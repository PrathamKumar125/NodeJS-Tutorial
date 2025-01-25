const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true,
    }
});

// Create and export the model
module.exports = mongoose.model('Planet', planetSchema);