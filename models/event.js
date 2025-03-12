
const mongoose = require('mongoose');
const Joi = require('joi');

const EventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength: 3, 
        maxlength: 20
    },
    description:{
        type : String,
        required : true,
        minlength: 3, 
        maxlength: 100
    },
    date : {
        type: Date,
        required : true,
    },
    capacity:{
        type: Number,
        required: true,
    },
    location: {
         type: String,
          required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});

function validateEvent(event){
    const schema = Joi.object({
        title : Joi.string().min(3).max(20).required(),
        description : Joi.string().min(3).max(100).required(),
        date : Joi.date().required(),
        capacity : Joi.number().required(),
        location : Joi.string().required()
    });
    return schema.validate(event);

}
module.exports.validateEvent = validateEvent;
module.exports.Event = mongoose.model('Event', EventSchema); // Event is the name of the collection in the database