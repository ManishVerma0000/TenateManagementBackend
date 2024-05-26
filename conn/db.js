const mongoose = require('mongoose');
const conn = mongoose.connect('mongodb://manishverma88180:3Y50zeqNnIaJDNE0@ac-tkigxzf-shard-00-00.gdbggdp.mongodb.net:27017,ac-tkigxzf-shard-00-01.gdbggdp.mongodb.net:27017,ac-tkigxzf-shard-00-02.gdbggdp.mongodb.net:27017/?ssl=true&replicaSet=atlas-mr0lbp-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0').then((res) => {
    console.log('connected')
}).catch((err) => {
    console.log(err.message)
})

module.exports = conn