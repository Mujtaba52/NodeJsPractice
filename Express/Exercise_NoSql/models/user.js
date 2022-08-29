const getDb = require("../utils/database").getdb
const mongodb = require('mongodb')

const Object = mongodb.ObjectId;

class User{
    constructor(name,email){
        this.name = name;
        this.email =email;
    }

    save(){
        const db = getDb(); 
        db.collection("users").insertOne(this)
    }

    static findById(id){
        const db= getDb();
        db.collection("users").findOne({_id:new Object(id)})
    }


}

module.exports = User;