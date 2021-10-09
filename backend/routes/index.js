const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to ChatWithSvelte API');
})
router.use('/api', require('./api'))

module.exports = router;