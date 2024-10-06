const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'))

// GET /feed/posts
router.get('/', (req, res) => {
    //#swagger.tags=['Welcome World']
    res.send('Welcome to the API')
});

router.use('/users', require('./users'))

module.exports = router;