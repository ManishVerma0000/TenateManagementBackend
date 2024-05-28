const Tenat = require("../schema/tenatModel");

const monthlyCharge = async (req, res) => {
    try {
        let dateObj = new Date();
        dateObj.setMonth(dateObj.getMonth() + 1);
        dateObj.setDate(1);
        let year = dateObj.getFullYear();
        let month = String(dateObj.getMonth() + 1).padStart(2, "0");
        let day = String(dateObj.getDate()).padStart(2, "0");
        let formattedDate = `${year}-${month}-${day}`;

        const totalChargeMonthWise = await Tenat.aggregate([
            {
                $match: {
                    NextInstallement: formattedDate
                }
            },
            {
                $group: {
                    _id: null,
                    totalWaterCharge: { $sum: { $toInt: "$waterCharge" } },
                    totalElectricityCharge: { $sum: { $toInt: "$electricitycharge" } },
                    totalOtherCharge: { $sum: { $toInt: "$otherCharge" } },
                    totalRent: { $sum: { $toInt: "$rent" } }
                }
            }
        ]);

        res.status(200).json(totalChargeMonthWise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = monthlyCharge;
