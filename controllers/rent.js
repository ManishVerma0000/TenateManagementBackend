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

module.exports = totalBill