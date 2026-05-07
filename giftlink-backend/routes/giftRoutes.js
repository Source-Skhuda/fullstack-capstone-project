const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

router.get('/', async (req, res, next) => {
    try {
        // Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();
        // use the collection() method to retrieve the gift collection
        const collection = db.collection("gifts");
        // Fetch all gifts using the collection.find method. Chain with toArray method to convert to JSON array
        const gifts = await collection.find({}).toArray();
        // return the gifts using the res.json method
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        // Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();
        // use the collection() method to retrieve the gift collection
        const collection = db.collection("gifts");
        const id = req.params.id;

        // Find a specific gift by ID using the collection.findOne method and store in constant called gift
        const gift = await collection.findOne({ id: id.toString() });
        if (!gift) {
            return res.status(404).send('Gift not found');
        }
        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        next(e);
    }
});

// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);
        if (!gift.acknowledged) {
            return res.status(500).json({ message: "Failed to add the item" });
        }
        res.status(201).json({
            id: gift.insertedId,
            ...req.body
        });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
