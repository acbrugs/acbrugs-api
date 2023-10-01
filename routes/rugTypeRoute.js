const express = require('express');
const rugTypeController = require('../controllers/rugTypeController');
const { protect, restrictToAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/api/v1/rugTypes')
  .get(rugTypeController.getAllRugTypes)
  .post(protect, restrictToAdmin, rugTypeController.createRugType);

router
  .route('/api/v1/rugTypes/:id')
  .get(rugTypeController.getRugType)
  .put(protect, restrictToAdmin, rugTypeController.updateRugType)
  .delete(protect, restrictToAdmin, rugTypeController.deleteRugType);

module.exports = router;
