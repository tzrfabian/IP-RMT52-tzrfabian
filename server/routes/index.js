const UserController = require('../controllers/UserController');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Hi Fellas" });
})

module.exports = router;