const { initializeApp , applicationDefault } = require('firebase-admin/app');


process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp({
    credential : applicationDefault(),
    projectId: "todoapp-d96a2"
});
