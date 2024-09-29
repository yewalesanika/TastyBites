const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js")

const MongoBDUrl = "mongodb://localhost:27017/samudra"

main()
.then(()=>{
    console.log("Conneted");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MongoBDUrl);
}

const initData = async() => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
}

initData()
.then((res)=>{
    console.log("Data saved.....");
})
.catch((err)=>{
    console.log(err);
})