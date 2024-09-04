const ImageController = require('../controllers/ImageController');
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler');
const fileUpload = require('express-fileupload');
const router = require('express').Router();

router.use(fileUpload());

router.get('/', (req, res) => {
    res.status(200).json({ message: "Hi Fellas" });
});

// endpoint
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/login/google', UserController.googleLogin);

// middleware
router.use(authentication);

router.get('/api/images');
router.post('/api/images', ImageController.postImg);

router.use(errorHandler)

module.exports = router;