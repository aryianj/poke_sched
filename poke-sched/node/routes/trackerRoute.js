import express from 'express';
import {
  getAllItems,
  getById,
  getByName,
  createItem,
  updateItem,
  deleteItem
} from '../controller/controller.js';


// Factory keeps the same signature (db is unused because controller reads Firestore via getDb)
export default function makeTrackerRouter(_db) {
  const router = express.Router();
  router.get('/', getAllItems);
  router.get('/id/:id', getById);
  router.get('/name/:name', getByName);
  router.post('/', createItem);
  router.put('/name/:name', updateItem);
  router.delete('/name/:name', deleteItem);

  return router;
}