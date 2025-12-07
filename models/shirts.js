
const mongoose = require('mongoose');

const shirtsSchema = new mongoose.Schema({
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

module.exports = mongoose.model('shirts', shirtsSchema);
