const express = require('express');
const router = express.Router();
const {Event, validateEvent} = require("../models/event");

router.post("/events", async (req,res)=>{
    const {error} = validateEvent(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    const event = new Event({
        title : req.body.title,
        description : req.body.description,
        date : req.body.date,
        capacity : req.body.capacity,
        location : req.body.location
    })
   try {
     const result = await event.save();
     res.status(201).json(result);
   } catch (error) {
    res.status(400).json({message: error.message});
   }
});

router.get("/events", async(req,res)=>{
    try {
        const events = await Event.find().sort('date');
        res.status(200).json(events);

    } catch(error){
        res.status(400).json({message: error.message});
    }
});

router.get("/events/:id", async(req,res)=>{
    try {
        const event = await Event.findById(req.params.id);
        if(!event) return res.status(404).json({message: "Event not found"});
        res.status(200).json(event);
    } catch(error){
        res.status(400).json({message: error.message});
    }
});

router.put("/events/:id", async(req,res)=>{
    const {error} = validateEvent(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, {
            title : req.body.title,
            description : req.body.description,
            date : req.body.date,
            capacity : req.body.capacity,
            location : req.body.location
        }, {new: true});
        if(!event) return res.status(404).json({message: "Event not found"});
        res.status(200).json(event);
    } catch(error){
        res.status(400).json({message: error.message});
    }
});

router.delete("/events/:id", async(req,res)=>{
    try {
        const event = await Event.findByIdAndRemove(req.params.id);
        if(!event) return res.status(404).json({message: "Event not found"});
        res.status(200).json(event);
    } catch(error){
        res.status(400).json({message: error.message});
    }
});
router.get("/events/:id/registrations", async(req,res)=>{
    try {
        const event = await Event.findById(req.params.id);
        if(!event) return res.status(404).json({message: "Event not found"});
        res.status(200).json(event.registrations);
    } catch(error){
        res.status(400).json({message: error.message});
    }
});

module.exports = router;