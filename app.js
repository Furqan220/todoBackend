const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/user_router');
const app = express();

app.use(bodyParser.json());
app.use('/',userRoutes);
module.exports = app; 