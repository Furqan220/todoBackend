const router = require('express').Router();
const FcmController = require('../controllers/notification_controller.js') ;

router.post('/',FcmController.sendNotification);

module.exports = router;