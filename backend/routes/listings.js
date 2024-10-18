const express = require("express");
const router = express.Router();
const {listingSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listing.js");

const validateListing = (req,res,next) =>{
    let {err} = listingSchema.validate(req.body);
    if(err)
    {
        let errMsg = err.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next()
    }
}


router.get("/",async(req,res)=>{
    const allListing = await Listings.find({});
    res.json(allListing);
})

router.get("/:id",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findById({_id:id}).populate("review").populate("owner");
    res.json(listing);
})

router.post("/new",validateListing,wrapAsync(async(req,res)=>{
    let listing = req.body;
    const newListing = new Listings(listing);
    req.flash("sucess","new Listing created")
    await newListing.save();
    res.json({success:req.flash("sucess")[0]})
}))

router.get("/:id/edit",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findById({_id:id});
    res.json(listing)
})

router.put("/:id",validateListing,async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findByIdAndUpdate({_id:id},{title:req.body.title,description:req.body.description,price:req.body.price})
    res.json(listing)
})

router.delete("/:id",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findByIdAndDelete({_id:id});
    res.json(listing)
})

module.exports = router