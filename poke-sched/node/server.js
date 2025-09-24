import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import path, { dirname } from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { getDb } from './config/db.js';
import makeTrackerRouter from './routes/trackerRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'change-me',
  resave: false,
  saveUninitialized: false
}));

app.use(express.json());

// Firestore
const db = getDb();
app.use('/api/tracker', makeTrackerRouter(db));

// Serve static from ../public (project root)
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Node server running on port ${port}`);
});

export default app;