const axios = require('axios')

const addharCardVerification = async (req, res) => {
    try {

        const addharcardnumber = req.body.addharcardnumber;
        if (!addharcardnumber) {
            await res.status(400).send({ message: "please enter the addhar card number" })
        } else {
            try {
                const date = new Date().toLocaleDateString()


                let data = JSON.stringify({
                    "uid": '866376196167'
                });
                let config = {
                    method: 'post',
                    url: process.env.URL,
                    headers: {
                        'clientId': process.env.CLIENTID,
                        'secretKey': process.env.SECRETKEY,
                        'Content-Type': 'application/json',
                    },
                    data: data
                };
                // const encrypt_pan_number = EncryptData(uid)
                axios.request(config)
                    .then(async (response) => {
                        console.log(response.data)

                    })
                    .catch((error) => {
                        res.status(500).send({ message: error.message })
                    });

            } catch (error) {
                res.status(500).send({ message: error.message })
            }
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })

    }
}

module.exports = addharCardVerification