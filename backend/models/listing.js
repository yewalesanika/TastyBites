const mongoose = require("mongoose");
const Review = require("./review");
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
    price:Number,
    review:[{
        type: Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    }
})

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing)
    {
        await Review.deleteMany({_id:{$in:listing.review}})
    }
})

const Listings = mongoose.model("Listings", listingSchema);

module.exports = Listings