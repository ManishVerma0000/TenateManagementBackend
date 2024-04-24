
const dontenv = require('dotenv')
dontenv.config()
const express = require('express')
const app = express()
const port = 7000;
const fs = require('fs-extra')
const cors = require('cors')
const router = require('./routes/routes')
const conn = require('./conn/db')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const upload = require('./middleware/multer')
const sendEmail = require('./middleware/email')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api', router)

const cron = require('node-cron');

// cron.schedule('* * * * *', () => {
//     const currentTime = new Date().toLocaleTimeString();
//     // sendEmail()
//     console.log('Task executed at:', currentTime);
// });
// cron.schedule('*/2 * * * * *', () => {
//     console.log('running')
//     fsExtra.emptyDirSync(pdf);
// });


// Parse the input date string


app.use('/pdf', express.static('pdf'))

app.get('/image', upload, async (req, res) => {

    console.log(req.file)
})

const ipaddress = '172.19.224.1'

app.listen(port, ipaddress, () => {
    console.log(`server is listen on the port on  http://${ipaddress}:${port}`)
})
//172.19.224.1