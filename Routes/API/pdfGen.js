// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../../controllers/CRUD/pdfGen');

// Add existing routes here...

// Get PDF report of incoming items
router.get('/incoming', inventoryController.getIncomingPDFReport);

// Get PDF report of outgoing items
router.get('/outgoing', inventoryController.getOutgoingPDFReport);

module.exports = router;
