const express = require("express");
const router = express.Router({mergeParams:true});
const {reviewSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listings = require("../models/listing.js");

const validateReview= (req,res,next) =>{
    let {err} = reviewSchema.validate(req.body);
    if(err)
    {
        let errMsg = err.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next()
    }
}

router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let {id} = req.params
    const listing = await Listings.findById({_id:id});
    let newReview = new Review(req.body);
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("review saved");
}))

router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listings.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId)
}))

module.exports = router