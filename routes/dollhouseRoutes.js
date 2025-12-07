// routes/dollhouseRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DollhouseCollection = require('../models/DollhouseCollection');

// GET all dollhouse products
router.get('/', async (req, res) => {
    try {
        const dolls = await DollhouseCollection.find();
        res.json(dolls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single dollhouse product by ID
router.get('/:id', async (req, res) => {
    try {
        const doll = await DollhouseCollection.findById(req.params.id); // Use the dynamic route parameter
        if (!doll) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(doll);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: error.message });
    }
});


// POST new dollhouse item
router.post('/', async (req, res) => {
    const doll = new DollhouseCollection({
        title: req.body.title,
        image: req.body.mainImage,
        price: req.body.price,
        size: req.body.sizes,
        additionalInformation: req.body.additionalInformation,
        description: req.body.description,
        deliveryTimelines: req.body.deliveryTimelines,
        disclaimer: req.body.disclaimer,
        galleryImages: req.body.galleryImages,
        washcareInstructions: req.body.washcareInstructions
    });
    try {
        const newDoll = await doll.save();
        res.status(201).json(newDoll);
    } catch (error) {
        console.error("Error while saving:", error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
