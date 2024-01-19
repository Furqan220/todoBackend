const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/user_routers');
const todoRoutes = require('./routers/todo_routers');
const notiRoutes = require('./routers/notification_router');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/',userRoutes);
app.use('/todo',todoRoutes);
app.use('/notification',notiRoutes);
module.exports = app; 

