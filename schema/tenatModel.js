const mongoose = require('mongoose')


const tenatSchema = new mongoose.Schema({
    username: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    orgnisation: {
        type: String,
        default: ""
    },
    buildingno: {
        type: String,
        default: ""
    },
    dateofjoining: {
        type: String,
        default: ""
    },
    rent: {
        type: String,
        default: ""
    }
    ,
    people: {
        type: String,
        default: ""
    },
    addhar: {
        type: String,
        default: ""
    }
})

const tenat = mongoose.model('tenat', tenatSchema)

module.exports = tenat




