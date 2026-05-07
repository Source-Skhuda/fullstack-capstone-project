// loads environment variables from the .env file
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const pinoHttp = require('pino-http')({ logger });
// import the natural library
const natural = require('natural');

// initialize the express server
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(pinoHttp);

// Initialize the sentiment analyzer with the Natural's PorterStemmer and "English" language
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

// Define the sentiment analysis route
app.post('/sentiment', async (req, res) => {
    // extract the sentence parameter
    const { sentence } = req.body;

    if (!sentence) {
        logger.error('No sentence provided');
        return res.status(400).json({ error: 'No sentence provided' });
    }

    // Perform sentiment analysis
    try {
        const tokens = sentence
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/);
        const analysisResult = analyzer.getSentiment(tokens);
        let sentiment = "neutral";
        if (analysisResult > 0.33)  sentiment = "positive";
        else if (analysisResult < 0) sentiment = "negative";

        // Logging the result
        logger.info(`Sentiment analysis result: ${analysisResult}`);

        res.status(200).json({ sentimentScore: analysisResult, sentiment: sentiment });
    } catch (error) {
        logger.error(`Error performing sentiment analysis: ${error}`);
        res.status(500).json({ message: 'Error performing sentiment analysis' });
    }
});

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
