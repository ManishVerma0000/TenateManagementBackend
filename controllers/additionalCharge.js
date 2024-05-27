const tenat = require("../schema/tenatModel");

const additionalCharge = async (req, res) => {
    try {
        const id = req.query.id;
        console.log(id)
        if (!id) {
            await res.status(400).send({ message: "please provide the id" })
        } else {
            const finduser = await tenat.findByIdAndUpdate(id, {
                "waterCharge": req.body.waterCharge,
                "electricitycharge": req.body.electricitycharge,
                "otherCharge": req.body.otherCharge,
                onhold: true,
                ispending: false

            }, { new: true });

            // console.log(finduser)
            console.log(finduser)
            await res.status(200).send(finduser)
        }

    } catch (error) {
        console.log(error)
        await res.status(400).send({ message: error.message })
    }
}

module.exports = additionalCharge 