const express = require("express")
const app = express();

// app.use((req,res,next)=>{
//     console.log("Logging onto the console");
//     next();
// })
// app.use((req,res,next)=>{
//     console.log("Logging onto the console again");
//     next();
// })

app.use('/users',(req,res)=>{
    console.log("second one");
    res.send("<html>This is the user's Page<html>")
})
app.use('/',(req,res)=>{
    console.log("first one");
    res.send("<html> Hello World  !! </html>")
})

app.listen(3000)