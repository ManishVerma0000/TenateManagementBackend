const admin = require('../schema/adminschema')

const registerAdmin = async (req, res) => {

    try {

        const { phone, name, email, password } = req.body
        if (!phone || !email || !password || !name) {
            await res.status(400).send({ message: "please enter all the details" })
        } else {
            const data = await admin.create(
                req.body
            )

            await res.status(200).send({ message: "creatiopn of the admin is successfull", data: data })
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}




const loginadmin = async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log(req.body, 'this is the value of the requestbody')

        if (!email || !password) {
            await res.status(400).send({ message: "please enter all the details" })
        } else {
            const compareuser = await admin.findOne({ email: email });
            if (!compareuser) {
                await res.status(400).send({ message: "user is not find" })
            } else {
                console.log(compareuser.password == password)
                if (compareuser.password == password) {
                    await res.status(200).send({ message: "login completed" })
                } else {
                    await res.status(400).send({ message: "password mismatch" })
                }


                console.log(compareuser.password, 'this is the details here')
            }

        }
    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}


module.exports = { registerAdmin, loginadmin }