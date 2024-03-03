const express = require("express");
const mongoose= require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.MONGODBURL);

module.exports=connection;