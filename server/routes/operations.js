const express = require('express');
const router = express.Router();
const operationsController = require('../controllers/operationsController');


router.get('/', operationsController.getOperations);
router.get('/all', operationsController.getAllOperations);

router.post('/', operationsController.addOperation);

module.exports = router;
