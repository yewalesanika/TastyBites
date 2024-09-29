const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
    },
    description:String,
    image:{
        type:String,
        required:true,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSGjlNG3RjniQOibSeuwXOPAhfULQ1UEFw4w&s",
        set : (v) => v === "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSGjlNG3RjniQOibSeuwXOPAhfULQ1UEFw4w&s" ? "link" : v,
    },
    price:Number
})

const Listings = mongoose.model("Listings", listingSchema);

module.exports = Listings