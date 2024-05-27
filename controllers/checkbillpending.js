// const tenat = require("../schema/tenatModel")

// const checkBillpending = async (req, res) => {
//     try {

//         const tenateDetails = await tenat.find()
//         await res.status(200).send(tenateDetails)

//         // const nextInstallmentDate = new Date(tenateDetails.NextInstallement);
//         // console.log(new Date())
//         // const currentDate = new Date()

//         // console.log(nextInstallmentDate, 'this is the details of the tenate')
//         // if (currentDate > nextInstallmentDate) {
//         //     const updateTenate = await tenat.findByIdAndUpdate('66540e2354135f20cddce068', { ispending: true }, { new: true })
//         //     console.log(updateTenate)
//         // } else {
//         //     console.log('The current date is not larger');
//         // }
//     } catch (error) {
//         await res.status(400).send({ message: error.message })
//     }
// }

// module.exports = checkBillpending

const tenat = require("../schema/tenatModel");

const checkBillpending = async () => {
    try {
        const tenateDetails = await tenat.find();
        const currentDate = new Date();
        for (let tenant of tenateDetails) {
            const nextInstallmentDate = new Date(tenant.NextInstallement);

            if (currentDate > nextInstallmentDate) {
                tenant.ispending = true;
                tenant.waterCharge = '',
                    tenant.electricitycharge = '',
                    tenant.otherCharge = '',
                    tenant.onhold = false

                const data = await tenant.save(); // Save the updated tenant document
                console.log(data)
            }
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

module.exports = checkBillpending;
