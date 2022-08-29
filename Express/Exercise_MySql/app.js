const express = require("express")

const bodyParser = require('body-parser');
const app = express();
const admin = require("./routes/admin")
const seq = require("./utils/database")
const product = require('./models/product')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json);

app.use(admin)

seq.sync().then((result)=>{
    console.log(result)
    app.listen(3000);
})
.catch(err => {
    console.log(err);
  });
// db.execute('SELECT * FROM products')
// app.listen(3000)