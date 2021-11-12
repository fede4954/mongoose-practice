const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Pass all the properties I want my schema to have inside the object
const studentSchema = new Schema({
    name: {type: String, required: true}, //Make sure all documents will have the required property
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    grades: {type: Array},
    class: {type: String},
    pendingBills: {type: Boolean, default: false}
}, {versionKey: false, timestamps: true})

//Export the model to be used on my main js
module.exports = mongoose.model('Student', studentSchema)
