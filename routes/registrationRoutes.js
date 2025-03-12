const express = require("express");
const router = express.Router();
const { Registration, validateRegistration } = require("../models/registration");
const { Event } = require("../models/event");

router.post("/register", async (req, res) => {
    
    const { error } = validateRegistration(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        // Check if the event exists
        const event = await Event.findById(req.body.eventID);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Create a new registration
        const registration = new Registration({
            eventID: req.body.eventID,
            name: req.body.name,
            email: req.body.email,
        });

        // Save to MongoDB
        const result = await registration.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/registrations", async (req, res) => {
    try {
        // Populate event details
        const registrations = await Registration.find().populate("eventID", "title date location");
        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/registrations/:eventID", async (req, res) => {
    try {
        const registrations = await Registration.find({ eventID: req.params.eventID }).populate("eventID", "title date location");
        if (!registrations.length) return res.status(404).json({ message: "No registrations found for this event" });

        res.status(200).json(registrations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/registrations/:id", async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);
        if (!registration) return res.status(404).json({ message: "Registration not found" });

        res.status(200).json({ message: "Registration deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;