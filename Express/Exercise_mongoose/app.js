const express = require("express")
const app = express();
const product = require("./routes/product")
const User = require("./routes/user")
let bodyParser = require('body-parser');
const users = require("./models/user")
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    users.findById('62d9bc5e75cc18b0f35e64aa')
      .then(user => {
        console.log(user)
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
app.use(product)
app.use(User)
mongoose.connect('mongodb+srv://Mujhassan786:connect4@mycluster.fvgee7z.mongodb.net/?retryWrites=true&w=majority')


app.listen(3000);

