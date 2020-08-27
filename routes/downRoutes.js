const express = require('express');
const downControllers = require('../controllers/downControllers');

const router = express.Router();

router.route('/').get(downControllers.getCounters);
router.route('/kniga').post(downControllers.incCounters);

module.exports = router;
