const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('OK');
})

router.use('/users', require('./user'));
router.use('/auth', require('./auth'));

module.exports = router;