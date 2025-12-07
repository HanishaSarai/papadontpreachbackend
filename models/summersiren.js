
const mongoose = require('mongoose');

const summersirenSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    size: [String], 
    additionalInformation: String,
    deliveryTimelines: String,
    description: String,
    disclaimer: String,
    galleryImages: [String],  
    washcareInstructions: String,    
});

module.exports = mongoose.model('summersiren', summersirenSchema);
