
const { getMessaging } = require("firebase-admin/messaging");

exports.sendNotification = (req, res, next) => {
        const receivedToken = req.query.token;
        console.log(receivedToken);
        
        
        const message = {
          notification: {
            title: "Notif",
            body: 'This is a Test Notification'
          },
          token: "receivedToken",

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


