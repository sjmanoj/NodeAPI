const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body
    if (!username || !email || !password){
        res.status(400)
        throw new Error('All fields are Mandatory')
    }
    const userAvailable = await Users.findOne({email})
    if (userAvailable){
        res.status(400)
        throw new Error('Email ID already Taken')
    }
    const hashedPassword = await bcrypt.hash(password,10)
    console.log(hashedPassword)
    const user = await Users.create({
        username, 
        email,
        password: hashedPassword
    })
    console.log(user);
    if (user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email
        })
    }
    else{
        res.status(400)
        throw new Error('Data Not Valid')
    }
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    if (!email || !password){
        res.status(400)
        throw new Error('All fields are Mandatory')
    }
    const user = await Users.findOne({email})
    if (user && (await bcrypt.compare(password,user.password))){
        const accessToken =jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_SECRET,
        {expiresIn: '50m'})
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error('Email or Password Not Valid')
    }

})

//Private
const currentUser = asyncHandler(async(req,res)=>{
    res.status(201).json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}