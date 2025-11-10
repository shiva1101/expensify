const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db('expensify'); // Database name
        console.log('MongoDB Atlas connected successfully');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) {
        throw new Error('Database not connected. Call connectDB first.');
    }
    return db;
};

module.exports = { connectDB, getDB };
