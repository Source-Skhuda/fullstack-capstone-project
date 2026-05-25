// loads environment variables from the .env file
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options and init connect insrance
let dbInstance = null;
let client = null;
const dbName = "giftdb";

async function connectToDatabase() {
    let url = `${process.env.MONGO_URL}`;
     if (!url) {
        console.log("connectToDatabase() called with EMPTY MONGO_URL");
        throw new Error("MONGO_URL is not set");
    }
    if (dbInstance) return dbInstance;

    if (!client) {
        client = new MongoClient(url);     
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");
    }
    // Connect to database giftDB and store in variable dbInstance
    dbInstance = client.db(dbName);
    // Return database instance
    return dbInstance;
}

module.exports = connectToDatabase;
