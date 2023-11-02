const app = require('./app');
const db = require('./config/db');
const UserModel = require('./models/user_model');
const port = 8000;

app.listen(port , ()=> {
    console.log('Server started to listen on port http://localhost:${port}')
});