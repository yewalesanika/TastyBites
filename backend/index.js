const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Listings = require("./models/listing.js");
const Review = require("./models/review.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");

const MongoDbUrl = "mongodb://localhost:27017/samudra";
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

async function  main() {
    await mongoose.connect(MongoDbUrl)
}

main()
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log(err);
})

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


app.get("/listings",async(req,res)=>{
    const allListing = await Listings.find({});
    res.json(allListing);
})

app.get("/listings/:id",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findById({_id:id}).populate("review");
    res.json(listing);
})

app.post("/listings",validateListing,wrapAsync(async(req,res)=>{
    let listing = req.body;
    const newListing = new Listings(listing);
    await newListing.save();
}))

app.get("/listings/:id/edit",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findById({_id:id});
    res.json(listing)
})

app.put("/listings/:id",validateListing,async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findByIdAndUpdate({_id:id},{title:req.body.title,description:req.body.description,price:req.body.price})
    res.json(listing)
})

app.delete("/listings/:id",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findByIdAndDelete({_id:id});
    res.json(listing)
})

app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
    let {id} = req.params
    const listing = await Listings.findById({_id:id});
    let newReview = new Review(req.body);
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("review saved");
}))

app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listings.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId)
}))

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
})

app.use((err,req,res,next)=>{
    console.log("error",err);
    let {status,message} = err;
    res.status(status).send(message)
})

app.listen(PORT,()=>{
    console.log("App listining to port 8080")
})