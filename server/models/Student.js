const {model, Schema} = require('mongoose')

module.exports = model('Student', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    parentsPhone: {
        mother: Number,
        father: Number,
    },
    password: String,
    totalScore: Number,
    attendance: [
        {
           status: Boolean,
           date: Date,
           reason: String,
           score: Number 
        }
    ]

},{timestamps: true}))