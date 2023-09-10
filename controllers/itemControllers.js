const asyncHandler = require('express-async-handler')
const Items = require('../models/itemModel')

const getItems = asyncHandler(async(req,res)=>{
    const items = await Items.find({user_id: req.user.id})
    res.status(200).json(items)
})

const getItem = asyncHandler(async(req,res)=>{
    const item = await Items.findById(req.params.id)
    if (!item){
        res.status(404)
        throw new Error('Item Not Found')
    }
    if (item.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error('User not Authorized')
    }
    res.status(200).json(item)
})

const createItem = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const { itemname, price, quantity} = req.body
    if (!itemname || !price || !quantity){
        res.status(400)
        throw new Error('All fields are Mandatory')
    }
    const item = await Items.create({
        itemname, price, quantity, user_id: req.user.id
    })
    res.status(201).json(item)
})

const updateItem = asyncHandler(async(req,res)=>{
    const item = await Items.findById(req.params.id)
    if (!item){
        res.status(404)
        throw new Error('Item Not Found')
    }
    if (item.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error('User not Authorized')
    }
    const updatedItem = await Items.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedItem)
})

const deleteItem = asyncHandler(async(req,res)=>{
    const item = await Items.findById(req.params.id)
    if (!item){
        res.status(404)
        throw new Error('Item Not Found')
    }
    if (item.user_id.toString()!==req.user.id){
        res.status(403)
        throw new Error('User not Authorized')
    }
    await Items.findByIdAndDelete(req.params.id)
    res.status(200).json(item)
})

module.exports = {getItems, getItem, createItem, updateItem, deleteItem}