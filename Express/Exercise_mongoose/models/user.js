const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    cart :{
        items: [{
            productId :{ type:mongoose.Schema.Types.ObjectId, ref : 'product' },
            quantity:{type:Number, required:true}
        }]
    } 

})

userSchema.methods.addToCart = function(product){
    let productIndex = this.cart.items.findIndex(cp=>{
        return cp.productId.toString()===product._id.toString();
    })

    let newQuantity =1;
    const updatedItems = [...this.cart.items];

    if(productIndex>=0){
        newQuantity=this.cart.items[productIndex].quantity + 1;
        updatedItems[productIndex].quantity = newQuantity;
    }
    else{
        updatedItems.push({
            productId : product._id,
            quantity : newQuantity
        })
    }
        const updatedcart = {
            items: updatedItems
        }
        this.cart = updatedcart;
        return this.save();
}

module.exports = mongoose.model("user",userSchema)