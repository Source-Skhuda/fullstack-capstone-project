// loads environment variables from the .env file
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const logger = require('../logger');

const JWT_SECRET = process.env.JWT_SECRET;

// Validation rules
const registerValidation = [
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("firstName").trim().notEmpty().withMessage("First name is required").isLength({ min: 2 }),
  body("lastName").trim().notEmpty().withMessage("Last name is required").isLength({ min: 2 }),
];

router.post('/register', registerValidation, async (req, res, next) => {
    logger.info(`POST /register called with body: ${JSON.stringify(req.body)}`);
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Connect to the database
        const db = await connectToDatabase();
        const collection = db.collection("users");
        // Check if user already exists
        const existingUser = await collection.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        const email = req.body.email;
        // Insert the new user into the database
        const user = await collection.insertOne({
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            createdAt: new Date()
        });
        if (!user.acknowledged) {
            return res.status(500).json({ message: "Failed to register user" });
        }
        logger.info('User registered successfully');
        // Generate JWT token
        const payload = {
            user: {
                id: user.insertedId,
            },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.json({ authtoken, email });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
