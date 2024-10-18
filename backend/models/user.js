const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalmongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    email : String
})

userSchema.plugin(passportlocalmongoose)

module.exports =  mongoose.model("User",userSchema); 