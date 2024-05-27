const monthlyCharge = async (req, res) => {
    try {


    } catch (error) {
        await res.status(400).send({ message: error.message })

    }
}

module.exports = monthlyCharge