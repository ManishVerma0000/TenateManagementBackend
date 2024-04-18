
const dontenv = require('dotenv')
dontenv.config()
const express = require('express')
const app = express()
const port = 5000;
const cors = require('cors')
const router = require('./routes/routes')
const conn = require('./conn/db')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const upload = require('./middleware/multer')
const sendEmail = require('./middleware/email')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api', router)

const cron = require('node-cron');

// cron.schedule('* * * * *', () => {
//     const currentTime = new Date().toLocaleTimeString();
//     sendEmail()
//     console.log('Task executed at:', currentTime);
// });
cron.schedule('*/2 * * * * *', () => {
    const currentTime = new Date().toLocaleTimeString();
    sendEmail();
    console.log('Task executed at:', currentTime);
});


app.post('/image', upload, async (req, res) => {
    console.log(req.file)
})

const ipaddress = '172.19.224.1'

app.listen(port, ipaddress, () => {
    console.log(`server is listen on the port on http://${ipaddress}:${port}`)
})