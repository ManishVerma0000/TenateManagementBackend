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

    dateofjoining: {
        type: String,
        default: ""
    },
    rent: {
        type: String,
        default: ""
    }
    ,
    addhar: {
        type: String,
        default: ""
    },
    roomNo: {
        type: String,
        default: ""
    },
    buildingId: {
        type: String,
        default: ""
    },
    people: {
        type: String,
        default: ""
    },

    NextInstallement: {
        type: String,
        default: ""
    },
    ispending: {
        type: Boolean,
        default: true
    }
})

const tenat = mongoose.model('tenat', tenatSchema)

module.exports = tenat




