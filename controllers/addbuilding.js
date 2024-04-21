const building = require('../schema/buildingModel')


const addbuilding = async (req, res) => {
    try {

        const { buildingname, room, location, caretaker } = req.body
        if (!buildingname || !room || !location || !caretaker) {
            await res.status(400).send('please enter the building')
        } else {
            const createBuilding = await building.create({
                buildingname,
                rooms: room || [],
                location,
                caretaker
            });


            await res.status(200).send(createBuilding)

        }

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