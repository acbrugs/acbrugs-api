const express = require('express');
const rugController = require('../controllers/rugController');
const { protect, restrictToAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/api/v1/rugs')
  .get(rugController.getAllRugs)
  .post(protect, restrictToAdmin, rugController.createRug);
router.route('/api/v1/rugs/type/:rugTypeId').get(rugController.getAllRugsByType);
router
  .route('/api/v1/rugs/:id')
  .get(rugController.getRugById)
  .put(protect, restrictToAdmin, rugController.updateRug)
  .delete(protect, restrictToAdmin, rugController.deleteRug);

module.exports = router;
