const {model, Schema} = require('mongoose')

module.exports = model('user', new Schema({
    login:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        minlength: 6,
        required: true
    },
    status:{
        type: String,
        enum: ["admin", "teacher", "student"],
        default: "student"
    },
    info: {
        type: String
    }
    
    

},{timestamps: true}))