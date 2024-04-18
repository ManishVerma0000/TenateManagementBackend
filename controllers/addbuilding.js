const building = require('../schema/buildingModel')


const addbuilding = async (req, res) => {
    try {
        const { buildingname, room, location, caretaker } = req.body
        const createBuilding = await building.create(req.body)

        await res.status(200).send(createBuilding)

    } catch (error) {
        await res.status(400).send(error.message)
    }
}



const listofbuilding = async (req, res) => {
    try {
        const listofbuildingdata = await building.find({})
        await res.status(200).send(listofbuildingdata)

    } catch (error) {
        await res.status(400).send(error.message)

    }
}

module.exports = { addbuilding, listofbuilding }