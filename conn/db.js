const mongoose = require('mongoose');


const conn = mongoose.connect(process.env.CONNURL).then((res) => {
    console.log('connected')
}).catch((err) => {
    console.log(err)
})

module.exports = conn