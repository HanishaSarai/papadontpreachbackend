// routes/subscriber.js
const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

router.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    try {
        const exists = await Subscriber.findOne({ email });
        if (exists) return res.status(409).json({ message: 'Already subscribed' });

        const newSub = new Subscriber({ email });
        await newSub.save();
        res.status(201).json({ message: 'Subscribed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
