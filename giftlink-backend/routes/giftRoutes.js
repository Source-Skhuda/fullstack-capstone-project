const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const logger = require('../logger');

// GET ALL GIFTS
router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        const gifts = await collection.find({}).toArray();
        res.json(gifts);

    } catch (e) {
        next(e);
    }
});

// GET GIFT BY ID (FIXED)
router.get('/:id', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        const id = Number(req.params.id);

        const gift = await collection.findOne({ id });

        if (!gift) {
            return res.status(404).json({ message: "Gift not found" });
        }

        res.json(gift);

    } catch (e) {
        next(e);
    }
});

// ADD GIFT
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        const result = await collection.insertOne(req.body);

        res.status(201).json({
            id: result.insertedId,
            ...req.body
        });

    } catch (e) {
        next(e);
    }
});

module.exports = router;