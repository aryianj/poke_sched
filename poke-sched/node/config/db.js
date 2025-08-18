const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);
let db;

async function connectToMongo() {
    try {
        await client.connect();
        console.log('Successfully connected to MongoDB');
        db = client.db('users');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

function getDb() {
    return db;
}

function getClient() {
    return client;
}

module.exports = {
    connectToMongo,
    getDb,
    getClient
};