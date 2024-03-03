const express = require("express");
const mongoose= require("mongoose");

const productSchema = mongoose.Schema({

    title:String,
    image:String,
    category:String,
    description: String,
    price: Number,
    userId:String
    
},{
    versionKey:false
});

const ProductModel = mongoose.model("product",productSchema);

module.exports = ProductModel;