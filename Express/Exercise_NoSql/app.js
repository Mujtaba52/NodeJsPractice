const express = require("express")
const app = express();
const admin = require("./routes/admin")
let bodyParser = require('body-parser');

const mongoConnect = require('./utils/database').mongoConnect
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(admin)

mongoConnect(()=>{
    // console.log(client);
    app.listen(3000);
})


// db.execute('SELECT * FROM products')
//app.listen(3000)