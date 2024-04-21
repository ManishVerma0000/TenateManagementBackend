const axios = require('axios')
// export const CLIENT_ID = "5b172f070b36c9418feef5b8134e61d8:5452178d940cc4b2251a1d6c89dde41f"
// export const SECRET_KEY = "dNzGFL03QF00m9K7SwKBcnCK32aHrkvpICGy8bpMPAjowc0K05NwuahPWD2JSCsYD"
//export const AADHARWITHOUTOTP = "https://api.emptra.com/emptra/aadharVerification"
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
                    url: 'https://api.emptra.com/emptra/aadharVerification',
                    headers: {
                        'clientId': '5b172f070b36c9418feef5b8134e61d8:5452178d940cc4b2251a1d6c89dde41f',
                        'secretKey': 'dNzGFL03QF00m9K7SwKBcnCK32aHrkvpICGy8bpMPAjowc0K05NwuahPWD2JSCsYD',
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