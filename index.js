const app = require('./app');
const port = process.env.PORT || 8000;


app.listen(port , ()=> {
    console.log('Server started to listen on port http://localhost:'+port.toString())
})