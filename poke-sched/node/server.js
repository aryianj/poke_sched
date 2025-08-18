const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const { connectToMongo, getClient } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

connectToMongo();

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const MongoStore = require('connect-mongo');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, 
        ttl: 24 * 60 * 60
    })
}));

app.use(express.json());

app.use('/api/users', userRoutes);


app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

process.on('SIGINT', async () => {
    await getClient().close();
    process.exit();
});

app.listen(port, () => {
    console.log(`Node server running on port ${port}`);
    console.log(`Python service URL: ${process.env.PYTHON_SERVICE_URL || 'http://localhost:5000'}`);
});