// loads environment variables from the .env file
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options and init connect insrance
let url = `${process.env.MONGO_URL}`;
let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance) return dbInstance;

    const client = new MongoClient(url);     
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");
    // Connect to database giftDB and store in variable dbInstance
    dbInstance = client.db(dbName);
    // Return database instance
    return dbInstance;
}

module.exports = connectToDatabase;
