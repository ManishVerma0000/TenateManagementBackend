const tenat = require("../schema/tenatModel")

const totalBill = async (req, res) => {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 since getMonth returns 0-indexed month
    let day = String(dateObj.getDate()).padStart(2, "0");
    let formattedDate = `${year}-${'05'}-${'23'}`;
    try {
        const tenants = await tenat.find({ NextInstallement: formattedDate });
        await res.json(tenants);

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}


const pendingBill = async (req, res) => {
    try {
        const pendingBills = await tenat.find({ ispending: true })
        await res.status(200).send(pendingBills)

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}



const completedPayement = async (req, res) => {
    try {

        const pendingBills = await tenat.find({ ispending: false })
        await res.status(200).send(pendingBills)

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}


const updatePaymentsuccess = async (req, res) => {
    try {


        const id = req.query.id;
        console.log(id)
        if (!id) {
            await res.status(400).send({ message: "please enter the id" })
        } else {
            const updateDetailstodb = await tenat.findByIdAndUpdate(id, {
                ispending: false
            })

            console.log(updateDetailstodb)
            await res.status(200).send(updateDetailstodb)
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}



const makepayementpending = async (req, res) => {
    try {


        const id = req.query.id;
        console.log(id)
        if (!id) {
            await res.status(400).send({ message: "please enter the id" })
        } else {
            const updateDetailstodb = await tenat.findByIdAndUpdate(id, {
                ispending: true
            })

            console.log(updateDetailstodb)
            await res.status(200).send(updateDetailstodb)
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}



module.exports = { totalBill, pendingBill, completedPayement, updatePaymentsuccess, makepayementpending }