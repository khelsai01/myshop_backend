const express = require("express");
const userRouter = require("./routes/user.routes");
const connection = require("./connection");
const productRouter = require("./routes/product.routes");
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{

    res.send("Wellcome to home page")
});
app.use("/users",userRouter);
app.use("/products",productRouter);



app.listen(8080, async()=>{
    try {
        await connection;
        console.log('server is connected to database and running at port 8080')
    } catch (error) {
       console.log(error) 
    }
})