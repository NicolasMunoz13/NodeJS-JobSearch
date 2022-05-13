const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    salary: {
        type: String,
        required: true
    },
    emailContact:{
        type: String,
        required: true
    },
    yearsExperience: String,
    area: String
})

const Job = mongoose.model('job', JobSchema);

module.exports = Job