const AWS = require('aws-sdk');
const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');

const generatepdfS3 = async (req, res) => {
    try {

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}

module.exports = generatepdfS3


app.post('/uploadFile', upload.single('file'), async (req, res) => {
    console.log(req.file.filename)
    console.log(req.file.path)
    AWS.config.update({
        region: process.env.AWS_S3_REGION_NAME,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const s3 = new AWS.S3();
    const params = {
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
        Key: req.file.filename,
        Body: req.file.path
    };


    s3.upload(params, (err, data) => {
        if (err) {
            console.log('Error uploading file:', err);
        } else {
            console.log('File uploaded successfully. File location:', data.Location);
        }
    });
})