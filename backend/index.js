const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Listings = require("./models/listing.js");

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

app.get("/listings",async(req,res)=>{
    const allListing = await Listings.find({});
    res.json(allListing);
})

app.get("/listings/:id",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findById({_id:id});
    res.json(listing);
})

app.post("/listings/new",async(req,res)=>{
    await Listings.create(req.body)
    .then((listing)=>{
        res.json(listing)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get("/listings/:id/edit",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findById({_id:id});
    res.json(listing)
})

app.put("/listings/:id",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findByIdAndUpdate({_id:id},{title:req.body.title,description:req.body.description,price:req.body.price})
    res.json(listing)
})

app.delete("/listings/:id",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listings.findByIdAndDelete({_id:id});
    res.json(listing)
})

app.listen(PORT,()=>{
    console.log("App listining to port 8080")
})