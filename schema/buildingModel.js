const mongoose = require('mongoose')


const buildingSchema = new mongoose.Schema({
    buildingname: {
        type: String,
        default: ""
    },
    room: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    caretaker: {
        type: String,
        default: ""
    }
})

const building = mongoose.model('building', buildingSchema)

module.exports = building




