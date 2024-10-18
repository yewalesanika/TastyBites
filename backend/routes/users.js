const express = require("express");
const router = express.Router();
const User = require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router.post("/signup",wrapAsync(async(req,res)=>{
    let {email,username,password} = req.body;
    const newUser = new User({email:email,username:username})
    const regUser = await User.register(newUser,password);
    console.log(regUser);
}))

router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(async(req,res)=>{
    console.log("logged in")
}))

router.get("/logout",async(req,res)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }
    })
})

module.exports = router