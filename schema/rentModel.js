const mongoose = require('mongoose')


const rentSchema = new mongoose.Schema({
    Amount: {
        type: String,
        default: ""
    },
    TenateId: {
        type: String,
        default: ""
    },
    Month: {
        type: String,
        default: ""
    },
    ispending: {
        type: Boolean,
        default: true
    }a
})

const rent = mongoose.model('rent', rentSchema)
module.exports = rent