const router = require('express').Router();
const FcmController = require('../controllers/notification_controller.js') ;
const firebase = require('../config/firebase');
router.post('/',FcmController.sendNotification);

module.exports = router;