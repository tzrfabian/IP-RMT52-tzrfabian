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
router.post('/api/register', UserController.register);
router.post('/api/login', UserController.login);
router.post('/api/login/google', UserController.googleLogin);

// middleware
router.use(authentication);

router.get('/api/images', ImageController.getAllImgData);
router.post('/api/images', ImageController.postImg);
router.delete('/api/images/:id', ImageController.deleteOneData)

router.use(errorHandler)

module.exports = router;