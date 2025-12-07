const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel");

// Signup Route
router.post('/signup', async (req, res) => {
    console.log("Signup request body:", req.body); // Debugging
    const { username, email, password } = req.body;

    // Backend validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const userExists = await usermodel.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const newUser = new usermodel({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await usermodel.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await user.matchPassword(password); // or compare plain if not hashed
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Login successful", data: { username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
