const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listings.js")
const reviews = require("./routes/reviews.js")

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


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


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