const mongoose = require('mongoose');


const conn = mongoose.connect('mongodb+srv://manishverma88180:3Y50zeqNnIaJDNE0@cluster0.gdbggdp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then((res) => {
    console.log('connected')
}).catch((err) => {
    console.log(err)
})

module.exports = conn