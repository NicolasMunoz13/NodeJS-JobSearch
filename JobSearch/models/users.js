const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: String,
    email:{
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'applicant',
        enum: ['applicant', 'offerer', 'admin']
    },
    accessToken: {
        type: String
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User