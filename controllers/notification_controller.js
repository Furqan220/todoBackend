const { initializeApp , applicationDefault } = require('firebase-admin/app');
const { getMessaging } = require("firebase-admin/messaging");


process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp({
    credential : applicationDefault(),
    projectId: "todoapp-d96a2"
});

    exports.sendNotification = (req, res, next) => {
        const receivedToken = req.body.fcmToken;
        
        const message = {
          notification: {
            title: "Notif",
            body: 'This is a Test Notification'
          },
          token: "eRP8vSH-R52rt0-4iT3dKc:APA91bGg-z1T4r_ldMUYM5xs5yrgl9IWerF8dJa-mWbHZPDyFkkSNhXU2mvtzir-1M89Tud10t3JA0xlvBDo3t2yYdHX9IQCM7eCRF4VheKvz_cM5E3jHFssPJcw6cVyF0Kw6DgU_keT",
        };
        
        getMessaging()
          .send(message)
          .then((response) => {
            res.status(200).json({
              message: "Successfully sent message",
              token: receivedToken,
            });
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            res.status(400);
            res.send(error);
            console.log("Error sending message:", error);
          });
        
        
      };


