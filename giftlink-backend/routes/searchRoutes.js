const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const logger = require('../logger');

// Search for gifts
router.get('/', async (req, res, next) => {
    try {
        // Connect to MongoDB using connectToDatabase database
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        // Initialize the query object
        let query = {};

        if (req.query.name && req.query.name.trim() !== "") {
            query.name = { $regex: req.query.name, $options: "i" }; // Using regex for partial match, case-insensitive
        }
        if (req.query.category && req.query.category.trim() !== "") {
            query.category = { $regex: req.query.category, $options: "i" };
        }
        if (req.query.condition && req.query.condition.trim() !== "") {
            query.condition = { $regex: req.query.condition, $options: "i" };
        }
        if (req.query.age_years && !isNaN(req.query.age_years)) {
            query.age_years = { $lte: Number(req.query.age_years) };
        }
        logger.info(`Search query: ${JSON.stringify(query)}`);
        // Fetch filtered gifts
        const gifts = await collection.find(query).toArray();
        
        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
