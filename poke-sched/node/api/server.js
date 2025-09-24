import express from 'express';
import makeTrackerRouter from '../routes/trackerRoute.js';
import { getDb } from '../config/db.js';

const app = express();
app.use(express.json());

const db = getDb();
app.use('/api/tracker', makeTrackerRouter(db));

export default app;