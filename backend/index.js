const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listings.js")
const reviews = require("./routes/reviews.js")
const user = require("./routes/users.js")
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport")
const LocalStratergy = require("passport-local")
const User = require("./models/user.js")

const MongoDbUrl = "mongodb://localhost:27017/samudra";
const PORT = 8080;

const sessionOptions = {
    secret : "mySuperSeceretCode",
    resave : false,
    saveUninitialized : true,
    cookie :{
        expires : Date.now() +  7 * 24 * 60 * 60 * 1000,
        maxAge :  7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session(sessionOptions));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

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
app.use("/",user);

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