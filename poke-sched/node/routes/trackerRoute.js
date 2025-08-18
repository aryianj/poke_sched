const express = require('express');
const router = express.Router();
const TrackerController = require('../controllers/trackerController');
const Tracker = require('../models/trackerModel');
const { getClient } = require('../config/db');

const db = getClient().db('tracker');
const trackerModel = new Tracker(db);
const trackerController = new TrackerController(trackerModel);

router.get('/', (req, res) => {
  return trackerController.getAllItems(req, res);
});


router.get('/:id', (req, res) => {
  return trackerController.getById(req, res);
});

// Create new coach
router.post('/', (req, res) => {
  return trackerController.createItem(req, res);
});

// Update coach by email
router.put('/:email', (req, res) => {
  return trackerController.updateItem(req, res);
});

// Delete coach by email
router.delete('/:email', (req, res) => {
  return trackerController.deleteItem(req, res);
});

module.exports = router;