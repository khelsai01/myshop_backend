const express = require("express");
const ProductModel = require("../modules/product.module");
const auth = require("../middleware/auth.middleware");

const productRouter = express.Router();

productRouter.get("/",auth,async(req, res)=>{

    try {
        const products = await ProductModel.find();
        return res.status(200).send(products);
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
});

productRouter.post("/add",auth, async(req,res)=>{
   try {
    const newProduct = new ProductModel.insertMany(req.body); 
    await newProduct.save();
    return res.status(200).send({message:"new product is added","product":newProduct})
   } catch (error) {
    return res.status(400).send({error:error.message})
    
   }
});


module.exports = productRouter;