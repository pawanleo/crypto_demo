const express = require('express');
const router = express.Router();
const cryptoController = require('../controller/cryptoController');

router.get('/recent/:code', cryptoController.getRecentCryptoData);
router.post('/update', cryptoController.updateCryptoData);

module.exports = router;
