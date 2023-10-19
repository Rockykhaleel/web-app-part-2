const mongoose= require('mongoose');

let ProductSchema= new mongoose.Schema({
    pname:{
        type:String,
        required:true,
        max:100
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

//export Model
const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;