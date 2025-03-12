const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); 

const RegistrationSchema = new mongoose.Schema({

    eventID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true

    },
    name : {
        type : String, 
        required : true,
        minlength: 3,
        maxlength: 20
    },
    email : {
        type : String,
        required : true,
        minlength: 3,
        maxlength: 20
    },
    createdAt : {
        type: Date,
        default: Date.now
    }

});

const Registration = mongoose.model('Registration', RegistrationSchema);

function validateRegistration(registration){
    const schema = Joi.object({
        eventID : Joi.objectId().required(),
        name : Joi.string().min(3).max(20).required(),
        email : Joi.string().min(3).max(20).required(),
        createdAt : Joi.date()
    });
    return schema.validate(registration);
}

module.exports = {Registration, validateRegistration};