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
    rentDate: {
        type: String,
        default: ""
    }
})

const tenat = mongoose.model('tenat', tenatSchema)

module.exports = tenat




